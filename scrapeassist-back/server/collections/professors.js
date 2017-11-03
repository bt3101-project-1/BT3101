import SimpleSchema from 'simpl-schema';

professors = new Meteor.Collection('professors');

professors.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
})

const relevantDataSchema = new SimpleSchema({
  url: {
    type: String
  },
  snippet: {
    type: String,
    optional: true
  }
})

const professorSchema = new SimpleSchema({
  universityId: {
    type: String
  },
  facultyId: {
    type: String
  },
  name: {
    type: String
  },
  rank: {
    type: String,
    optional: true
  },
  phdYear: {
    type: SimpleSchema.Integer,
    optional: true
  },
  phdInstitution: {
    type: String,
    optional: true
  },
  researchInterests: {
    type: String,
    optional: true
  },
  promotionYear: {
    type: SimpleSchema.Integer,
    optional: true
  },
  promotionInstitution: {
    type: String,
    optional: true
  },
  relevantData: {
    type: Array,
    // defaultValue: []
  },
  'relevantData.$': {
    type: relevantDataSchema
  }
})

professors.attachSchema(professorSchema)

Meteor.methods({
  searchProfessors: function (uIds, fId) {
    uIds.forEach( function (e) {
      if (universities.findOne({_id: e}) === undefined) {
        universities.insert({name: e})
      }
    })
    if (faculties.findOne({_id: fId}) === undefined) {
      faculties.insert({name: fId})
    }
    return professors.find({universityId: {$in: uIds}, facultyId: fId}).fetch()
  },
  editProfessor: function (pId, data) {
    professors.update(pId, {$set: data})
  }
})

Meteor.publish({
  allProfessors: function () {
    return professors.find({})
  }
})
