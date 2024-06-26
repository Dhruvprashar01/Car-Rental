import { v4 as uuid } from 'uuid'
import bcrypt from 'bcrypt'

export const User = (app, options) => {
    if (!options) {
        options = {}
    }
    options.storage = options.storage || 'default'

    const Schema = {
        name: 'User',
        priority: 0,
        props: [{
                name: 'id',
                type: 'id',
                format: 'uuid',
                default: () => uuid()
            },
            {
                name: 'name',
                type: 'text',
                format: 'name',
                default: null
            },
            {
                name: 'email',
                type: 'text',
                format: 'email',
                default: null
            },
            {
                name: 'password',
                type: 'text',
                format: 'password',
                default: null,
                beforeSave: (item) => bcrypt.hashSync(item.password, bcrypt.genSaltSync())
            },
            {
                name: 'invitedBy',
                type: 'ref',
                default: null
            },
            {
                name: 'inviteDate',
                type: 'datetime',
                format: 'date',
                default: null
            },
            {
                name: 'inviteId',
                type: 'ref',
                default: null
            },
            {
                name: 'disabled',
                type: 'boolean',
                default: false
            }
        ],
        isPassword: (encodedPassword, password) => bcrypt.compareSync(password, encodedPassword)
    }
    return Schema
}