module.exports = {

    cityWithSchools:`
    SELECT id FROM "schools" WHERE "cityId"=?
    `,
    schoolVisits:`   
    SELECT id FROM "visits" WHERE "schoolId"=?
    `,
    visitChecklist: `   
    SELECT id FROM "groupChecks" WHERE "visitId"=?
    `,
    groupCheckAvaliations:`
    SELECT id FROM "avaliationChecks" WHERE "groupChecksId"=?
    `

}

