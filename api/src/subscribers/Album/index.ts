import {
    EventSubscriber,
    EntitySubscriberInterface,
    InsertEvent,
    UpdateEvent,
    RemoveEvent,
} from 'typeorm'
import { validate } from 'class-validator'

import { Album } from '../../entities'

@EventSubscriber()
export class AlbumSubscriber implements EntitySubscriberInterface<Album> {
    async beforeInsert(event: InsertEvent<Album>) {
        await validateData(event.entity)
    }

    async beforeUpdate(event: UpdateEvent<Album>) {
        await validateData(event.entity)
    }

    beforeRemove(event: RemoveEvent<Album>) {
        console.log(
            `BEFORE ENTITY WITH ID ${event.entityId} REMOVED: `,
            event.entity
        )
    }

    afterInsert(event: InsertEvent<Album>) {
        console.log(`AFTER ENTITY INSERTED: `, event.entity)
    }

    afterUpdate(event: UpdateEvent<Album>) {
        console.log(`AFTER ENTITY UPDATED: `, event.entity)
    }

    afterRemove(event: RemoveEvent<Album>) {
        console.log(
            `AFTER ENTITY WITH ID ${event.entityId} REMOVED: `,
            event.entity
        )
    }

    afterLoad(entity: Album) {
        console.log(`AFTER ENTITY LOADED: `, entity)
    }
}

async function validateData(data: Partial<Album>) {
    try {
        const errors = await validate(data, { skipMissingProperties: true })
        if (errors.length > 0) {
            throw new TypeError(errors.toString())
        }
    } catch (err) {
        throw new Error(err.toString())
    }
}
