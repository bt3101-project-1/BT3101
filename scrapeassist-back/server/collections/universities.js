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

function importProfData () {
  if (!professors.find({}).count()) {
    var Fiber = require('fibers')
    var fileReader = require('readline').createInterface({
      input: require('fs').createReadStream('assets/app/testdata.json')
    })
    fileReader.on('line', function (line) {
      var data = JSON.parse(line)
      Fiber(function () {
        console.log('Importing data for Prof. ' + data.name)
        var uid = universities.upsert({name: data.university}, {$set: {name: data.university, facultyIds: []}})
        if (!uid.insertedId) {
          uid = universities.findOne({name: data.university})._id
        } else {
          uid = uid.insertedId
        }
        var fid = faculties.upsert({name: data.faculty}, {$set: {name: data.faculty}})
        if (!fid.insertedId) {
          fid = faculties.findOne({name: data.faculty})._id
        } else {
          fid = fid.insertedId
        }
        data['facultyId'] = fid
        data['universityId'] = uid
        delete data.university
        delete data.faculty
        if (!('relevantData' in data)) {
          data.relevantData = []
        }
        professors.insert(data)
      }).run()
    })
  }
}

function createCrawlRequests () {
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
}

importProfData()

Meteor.setTimeout(createCrawlRequests, 10000)

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
