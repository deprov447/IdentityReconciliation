const db = require("./db/api")

async function identifyHandler(req, res) {
    const { phoneNumber, email } = req.body

    await db.syncModel()

    const phoneNumberMatches = await db.findAll({ where: { phoneNumber } })
    const emailMatches = await db.findAll({ where: { email } })

    if (phoneNumberMatches.length == 0 && emailMatches.length == 0)
        await db.createPrimary(phoneNumber, email)
    else if (phoneNumberMatches.length == 0 || emailMatches.length == 0)
        await db.createSecondary(phoneNumber, email)
    else {
        const primaryPhoneNumber = phoneNumberMatches.find((ele) => (ele.linkPrecedence == 'primary'))
        const primaryEmail = emailMatches.find((ele) => (ele.linkPrecedence == 'primary'))

        if (primaryEmail.id != primaryPhoneNumber.id)
            await db.updateLatestToSecondary(primaryPhoneNumber, primaryEmail)
    }

    res.send(req.body)
}

module.exports = { identifyHandler }