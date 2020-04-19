import { Service } from 'typedi';
import uuid from 'uuid';

import { EventDispatcher, EventDispatcherInterface } from '../../decorators/EventDispatcher';
import { Logger, LoggerInterface } from '../../decorators/Logger';
import { User } from '../models/User';
import { events } from '../subscribers/events';

@Service()
export class UserService {

    constructor(
        @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    public login(): Promise<User> {
        this.log.info('Authenticate user');
        console.log(uuid.v4);
        this.eventDispatcher.dispatch(events.user.loggedIn, '');
        return undefined;
    }

    public logout(): Promise<boolean> {
        this.log.info('Destroy user session');
        this.eventDispatcher.dispatch(events.user.loggedOut, '');
        return undefined;
    }
}
