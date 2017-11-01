import SimpleSchema from 'simpl-schema';

universities = new Meteor.Collection('universities')

universities.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
})

const universitySchema = new SimpleSchema({
  name: {
    type: String
  }
})

universities.attachSchema(universitySchema)

if (!crawlrequests.find({}).count()) {
  var uId = universities.findOne({name: 'Duke University'})._id
  var fId = faculties.findOne({name: 'Biomedical Engineering'})._id
  var pIds = professors.find({universityId: uId}).fetch().map(e=>e._id)
  var fUrl = 'https://bme.duke.edu/faculty'
  var status = [1,1,1]
  var startTime = new Date(2017,10,6,8,42,23)
  var endTime = new Date(2017,10,6,11,22,23)
  crawlrequests.insert({
    timeStampStart: startTime,
    timeStampEnd: endTime,
    status: status,
    facultyUrl: fUrl,
    universityId: uId,
    facultyId: fId,
    professorIds: pIds
  })
  var crId = crawlrequests.findOne({
    status: status,
    facultyUrl: fUrl,
    universityId: uId,
    facultyId: fId,
    professorIds: pIds
  })._id
  crawlrequests.update(crId, {$set: {timeStampStart: startTime, timeStampEnd: endTime}})
}

Meteor.publish({
  allUniversities: function () {
    return universities.find({})
  }
})

Meteor.methods({
  createUniversities: function(names) {
    var Ids = []
    for (var i in names) {
      Ids.push(universities.insert({name: names[i]}))
    }
    return Ids
  }
})
