import { cloneMethod, hasCloneMethod } from '../../symbols.js';
export class CommandWrapper {
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
        if (hasCloneMethod(this.cmd))
            return new CommandWrapper(this.cmd[cloneMethod]());
        return new CommandWrapper(this.cmd);
    }
    toString() {
        return this.cmd.toString();
    }
}
