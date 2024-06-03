const { Op } = require("sequelize")
const db = require("./db/api")

async function identifyHandler(req, res) {
    await db.syncModel()
    const { phoneNumber, email } = req.body

    const phoneNumberMatches = await db.findAll({ where: { phoneNumber } })
    const emailMatches = await db.findAll({ where: { email } })

    if (phoneNumberMatches.length == 0 && emailMatches.length == 0)
        await db.createPrimary(phoneNumber, email)
    else if (phoneNumberMatches.length == 0 || emailMatches.length == 0)
        await db.createSecondary(phoneNumber, email)
    else {
        const primaryPhoneNumber = phoneNumberMatches.find((ele) => (ele.linkPrecedence == 'primary'))
        const primaryEmail = emailMatches.find((ele) => (ele.linkPrecedence == 'primary'))

        if (primaryEmail && primaryPhoneNumber && primaryEmail.id != primaryPhoneNumber.id)
            await db.updateLatestToSecondary(primaryPhoneNumber, primaryEmail)
    }

    const rows = await db.findAll({
        where: {
            [Op.or]: [
                { phoneNumber },
                { email }
            ]
        }
    })

    let primaryRow = rows.find((ele) => ele.linkPrecedence == 'primary')
    if (primaryRow == null)
        primaryRow = await db.findAll({ where: { id: rows[0].linkedId } })[0]

    let secondaryRows = await db.findAll({ where: { linkedId: primaryRow.id } })

    const resJSON = {
        primaryContatctId: primaryRow.id,
        emails: [...new Set([primaryRow.email, ...secondaryRows.map(row => row.email)].filter(ele => ele))],
        phoneNumbers: [...new Set([primaryRow.phoneNumber, ...secondaryRows.map(row => row.phoneNumber)].filter(ele => ele))],
        secondaryContactIds: secondaryRows.map(row => row.id)
    }

    res.send({ contact: resJSON })
}

module.exports = { identifyHandler }