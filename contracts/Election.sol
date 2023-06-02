// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

contract Election{

    address public manager;

    struct Candidate {
        uint id;
        string CfirstName;
        string ClastName;
        string CidNumber;
        uint voteCount;
    }

    mapping (address => bool) public voters;

    mapping (uint => Candidate) public candidates;

    uint public candidatesCount;

    event votedEvent (
        uint indexed_candidateId
    );


    constructor () public  {
        manager = msg.sender;
    }

    function addCandidate (string memory _CfirstName, string memory _ClastName, string memory _CidNumber) public onlyAdmin{
        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount, _CfirstName, _ClastName, _CidNumber, 0);
    }

    modifier onlyAdmin () {
        require(msg.sender == manager);
        _;
    }


    function vote (uint _candidateId) public {
        
        require(!voters[msg.sender]);

        require(_candidateId > 0 && _candidateId <= candidatesCount);

        voters[msg.sender] = true;

        candidates[_candidateId].voteCount ++;

        uint candidateId = _candidateId;

        emit votedEvent(_candidateId);
    }

    //users
    //register
    struct User {
        string firstName;
        string lastName;
        string idNumber;
        string email;
        string password;
        address add;
    }

    mapping (uint => User) public users;

    uint public usersCount;

    function addUser (string memory _firstName, string memory _lastName, string memory _idNumber, string memory _email, string memory _password) public{
        usersCount++;
        users[usersCount] = User(_firstName, _lastName, _idNumber, _email, _password, msg.sender);
    }




}