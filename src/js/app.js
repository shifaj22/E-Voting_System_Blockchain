App = {
    web3Provider: null,
    contracts: {},
    account: '0x0',
    hasVoted: false,
    votedForID: 0,
    finishElection: 0,
    mins: 0,


    // web3 connects our client side application to the blockchain.
    // metamask gives us an instance of web3 that we will use to connect to the blockchain
    // if this doesn't happen we will set a default web3 provider from our local blockchain instance 'localhost 7545'
    init: function () {
        return App.initWeb3();
    },

    initWeb3: async function () {
        // Modern dapp browsers...
        if (window.ethereum) {
            App.web3Provider = window.ethereum;
            try {
                // Request account access
                await window.ethereum.enable();
            } catch (error) {
                // User denied account access...
                console.error("User denied account access")
            }
        }
// Legacy dapp browsers...
        else if (window.web3) {
            App.web3Provider = window.web3.currentProvider;
        }
// If no injected web3 instance is detected, fall back to Ganache
        else {
            App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
        }
        web3 = new Web3(App.web3Provider);
        web3.eth.defaultAccount=web3.eth.accounts[0]
        return App.initContract();
    },



    // we then initailze our contract
    // this function loads up our contract to our front end application
    initContract: function () {
        $.getJSON("Election.json", function (election) {
            // Instantiate a new truffle contract from the artifact
            App.contracts.Election = TruffleContract(election);
            // Connect provider to interact with contract
            App.contracts.Election.setProvider(App.web3Provider);

            App.listenForEvents();

            return App.render();
        });
    },



    // Listen for events emitted from the contract
    listenForEvents: function () {
        App.contracts.Election.deployed().then(function (instance) {
            // Restart Chrome if you are unable to receive this event
            // This is a known issue with Metamask
            // https://github.com/MetaMask/metamask-extension/issues/2393
            instance.votedEvent({}, {
                fromBlock: 0,
                toBlock: 'latest'
            }).watch(function (error, event) {
                console.log("event triggered", event)
                // Reload when a new vote is recorded
                // App.render();
            });
        });
    },




    // render function which is what will layout all the content on the page
    render: function () {
        var electionInstance;
        var loader = $("#loader");
        var content = $("#content");
        var register = $("#register");

        loader.show();
        content.hide();


        // Load account data
        web3.eth.getCoinbase(function (err, account) {
            if (err === null) {
                App.account = account;
                $("#accountAddress").html("Your Account: " + account);
            }
        });



        App.contracts.Election.deployed().then(function(instance) {
            electionInstance = instance;
            // document.querySelector('.buy-tickets').style.display = 'none';

            return electionInstance.manager();
        }).then(function (manager) {
            if (manager !== App.account){
                document.querySelector('.buy-tickets').style.display = 'none';
            }

          return electionInstance.candidatesCount();
        }).then(function(candidatesCount) {
          var candidatesResults = $("#candidatesResults");
          candidatesResults.empty();

          var candidatesSelect = $('#candidatesSelect');
          candidatesSelect.empty();


          for (var i = 1; i <= candidatesCount; i++) {
            electionInstance.candidates(i).then(function(candidate) {
              var id = candidate[0];
              var fname = candidate[1];
              var lname = candidate[2];
              var idNumber = candidate[3];
              var voteCount = candidate[4];

              // Render candidate Result
              var candidateTemplate = "<tr><th>" + id + "</th><td>" + fname+ " " + lname + "</td><td>" + idNumber  + "</td><td>" + voteCount + "</td></tr>"
              candidatesResults.append(candidateTemplate);

              // Render candidate ballot option
              var candidateOption = "<option value='" + id + "' >" + fname + " " + lname + "</ option>"
              candidatesSelect.append(candidateOption);

                return electionInstance.candidatesCount();
            });
          }
          return electionInstance.voters(App.account);
        }).then( function(hasVoted) {
          // Do not allow a user to vote twice
          if(hasVoted) {
            $('form').hide();
              $("#index-text").html("You are successfully logged in!");
              $("#new-candidate").html("New candidates can't be added. The election process has already started.");
            $("#vote-text").html("Vote casted succesfully for candidate " + localStorage.getItem("votedForID"));
          }
          loader.hide();
          content.show();
          return electionInstance.usersCount();
        }).then(function (usersCount) {
            var voterz = $("#voterz");
            voterz.empty();

            for (var i = 1; i <= usersCount; i++) {
                electionInstance.users(i).then(function (user) {
                    var firstName = user[0];
                    var lastName = user[1];
                    var idNumber = user[2];
                    var email = user[3];
                    var address = user[5];

                    let voterTemplate = "<tr><td>" + firstName + " " + lastName + "</td><td>" + idNumber + "</td><td>" + email + "</td><td>" + address + "</td></tr>"
                    voterz.append(voterTemplate);
                });
            }


            if (localStorage.getItem("finishElection") === "1") {
                $('form').hide();
                $("#index-text").html("There is no active election ongoing at the moment");
                $("#vote-text").html("No active voting ongoing");
                // $("#result-text").html("The voting process has ended. These are the final results");
                document.querySelector('.addCandidateForm').style.display = 'block';
                // document.querySelector('.reg').style.display = 'none';
                document.querySelector('.vot').style.display = 'none';
            } else if (localStorage.getItem("finishElection") === "0") {

            }

        }).catch(function(error) {
          console.warn(error);
        });
    },



    castVote:  function () {
        var candidateId = $('#candidatesSelect').val();
        App.votedForID = candidateId;
        localStorage.setItem("votedForID", candidateId);
        App.contracts.Election.deployed().then(function (instance) {
            return instance.vote(candidateId, {from: App.account});
        }).then(function (result) {
            // Wait for votes to update
            $("#content").hide();
            $("#loader").show();


            location.href='results.html';
        }).catch(function (err) {
            console.error(err);
        });
    },


    addUser: async function () {
        var firstName = $('#firstName').val();
        var lastName = $('#lastName').val();
        var idNumber = $('#idNumber').val();
        var email = $('#email').val();
        var password = $('#password').val();
        var app = await App.contracts.Election.deployed();
        await app.addUser(firstName, lastName, idNumber, email, password);
        $("#content").hide();
        $("#loader").show();
        document.querySelector('.vot').style.display = 'block';
        location.href='vote.html';

    },


    addCandidate: async function (){
        var CfirstName = $('#CfirstName').val();
        var ClastName = $('#ClastName').val();
        var CidNumber = $('#CidNumber').val();

        var app = await App.contracts.Election.deployed();
        await app.addCandidate(CfirstName, ClastName, CidNumber);
        $("#content").hide();
        $("#loader").show();

        location.href='admin.html';
    },

    login: async function() {
        var lidNumber = $('#lidNumber').val();
        var lpassword = $('#lpassword').val();

        var app = await App.contracts.Election.deployed();
        var users = await app.users();
        var usersCount = await app.usersCount;

        for (var i = 1; i <= usersCount; i++) {
            electionInstance.users(i).then(function (user) {
                var idNumber = user[2];
                var password = user[4];
            });

            if (lidNumber === idNumber) {
                if(lpassword === password)
                {
                    location.href='results.html';
                }
                else {
                    prompt("Incorrect login details, Please try again");
                }

                break;
            }

        }

    },

    startElection: function () {
        localStorage.setItem("finishElection", "0");
        location.href='index.html';
    },

    endElection: function () {
        localStorage.setItem("finishElection", "1");
        location.href='results.html';
    }

};

$(function () {
    $(window).load(function () {
        App.init();
    });
});
