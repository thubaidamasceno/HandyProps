import {Ability} from '@casl/ability';

const roles = {
    dev: [{action: 'manage', subject: 'all'},{action: 'open', subject: 'all'},],
    admin: [
        {action: 'resetpass', subject: 'users'},
        {action: 'open', subject: ['usuarios']},
    ],
    user: {},
    guest: {},
};

export const ablmk = r => {
    var ablv = {};
    for (let k in r) {
        ablv[k] = new Ability(r[k]);
    }
    return (userrole, act, sub, opt) => {
        if (ablv && ablv[userrole] && ablv[userrole].can)
            return ablv[userrole].can(act, sub, opt);
        return false
    };
};

const abl = ablmk(roles);
export default abl;

