const { Contact } = require("./models/contact");

async function syncModel(params) {
    return await Contact.sync(params)
}

async function findAll(params) {
    return await Contact.findAll(params)
}

async function createPrimary(phoneNumber, email) {
    return await Contact.create({ phoneNumber, email })
}

async function createSecondary(phoneNumber, email) {
    const attributes = ['id', 'linkPrecedence', 'linkedId']
    const linkedByPhoneNumber = await findAll({ attributes, where: { phoneNumber } })
    const linkedByEmail = await findAll({ attributes, where: { email } })

    const knownFeature = linkedByPhoneNumber.length ? linkedByPhoneNumber[0] : linkedByEmail[0]
    const linkedId = knownFeature.linkPrecedence == 'primary' ? knownFeature.id : knownFeature.linkedId

    return await Contact.create({ phoneNumber, email, linkedId, linkPrecedence: "secondary" })
}

async function updateLatestToSecondary(phoneNumberPrimary, emailPrimary) {
    if (phoneNumberPrimary.createdAt > emailPrimary.createdAt) {
        phoneNumberPrimary.linkPrecedence = 'secondary'
        phoneNumberPrimary.linkedId = emailPrimary.id
        await phoneNumberPrimary.save()
    }
    else {
        emailPrimary.linkPrecedence = 'secondary'
        emailPrimary.linkedId = phoneNumberPrimary.id
        await emailPrimary.save()
    }
}

module.exports = {
    syncModel,
    findAll,
    createPrimary,
    createSecondary,
    updateLatestToSecondary
}