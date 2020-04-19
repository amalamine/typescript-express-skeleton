import { EventSubscriber, On } from 'event-dispatch';

import { Logger } from '../../lib/logger';
import { User } from '../models/User';
import { events } from './events';

const log = new Logger(__filename);

@EventSubscriber()
export class UserEventSubscriber {

    @On(events.user.loggedIn)
    public onUserLogin(user: User): void {
        log.info('User ' + user.toString() + ' logged in');
    }

    @On(events.user.loggedOut)
    public onUserLogout(user: User): void {
        log.info('User ' + user.toString() + ' logged out');
    }

}
