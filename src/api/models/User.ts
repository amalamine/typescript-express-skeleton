import * as bcrypt from 'bcrypt-nodejs';

export class User {

    public static hashPassword(password: string): Promise<string> {
        return new Promise((resolve, reject) => {
            bcrypt.hash(password, 10, (err, hash) => {
                if (err) {
                    return reject(err);
                }
                resolve(hash);
            });
        });
    }

    public static comparePassword(user: User, password: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, res) => {
                resolve(res === true);
            });
        });
    }

    public id: string;

    public firstName: string;

    public lastName: string;

    public email: string;

    public password: string;

    public toString(): string {
        return `${this.firstName} ${this.lastName} (${this.email})`;
    }

    public async hashPassword(): Promise<void> {
        this.password = await User.hashPassword(this.password);
    }

}
