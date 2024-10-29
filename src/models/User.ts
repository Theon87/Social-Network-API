import { Schema, model, ObjectId, type Document } from 'mongoose';

interface IUser extends Document {
    username: string;
    email: string;
    thoughts: ObjectId[];
    friends: ObjectId[];
}

const userSchema = new Schema<IUser>({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            // match a valid email address
            validator: function (v: string) {
                return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
            },
        },
    },
    thoughts: [
        {
        type: Schema.Types.ObjectId,
        ref: 'thought',
        },
    ],
    friends: [
        {
        type: Schema.Types.ObjectId,
        ref: 'user',
        },
    ],
},
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

userSchema
    .virtual('friendCount')
    .get(function () {
        return this.friends.length;
    }
);

const User = model('user', userSchema);

export default User;