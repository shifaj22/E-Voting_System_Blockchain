"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandWrapper = void 0;
const symbols_1 = require("../../symbols");
class CommandWrapper {
    constructor(cmd) {
        this.cmd = cmd;
        this.hasRan = false;
    }
    check(m) {
        return this.cmd.check(m);
    }
    run(m, r) {
        this.hasRan = true;
        return this.cmd.run(m, r);
    }
    clone() {
        if (symbols_1.hasCloneMethod(this.cmd))
            return new CommandWrapper(this.cmd[symbols_1.cloneMethod]());
        return new CommandWrapper(this.cmd);
    }
    toString() {
        return this.cmd.toString();
    }
}
exports.CommandWrapper = CommandWrapper;
