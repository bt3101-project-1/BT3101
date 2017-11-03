import SimpleSchema from 'simpl-schema';

saveslots = new Meteor.Collection('saveslots');

saveslots.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
})

const saveslotSchema = new SimpleSchema({
  professorIds: {
    type: Array,
    defaultValue: []
  },
  'professorIds.$' : {
    type: String
  },
  name: {
    type: String,
    defaultValue: '(blank)'
  },
  universityIds: {
    type: Array,
    defaultValue: []
  },
  'universityIds.$': {
    type: String
  },
  facultyId: {
    type: String,
    defaultValue: ''
  }
})

saveslots.attachSchema(saveslotSchema)

if (!saveslots.find({}).count()) {
  saveslots.insert({professorIds: [], universityIds: []})
  saveslots.insert({professorIds: [], universityIds: []})
  saveslots.insert({professorIds: [], universityIds: []})
  saveslots.insert({professorIds: [], universityIds: []})
  saveslots.insert({professorIds: [], universityIds: []})
  saveslots.insert({professorIds: [], universityIds: []})
  saveslots.insert({professorIds: [], universityIds: []})
  saveslots.insert({professorIds: [], universityIds: []})
}

Meteor.methods({
  setSaveSlot: function (sId, pIds, name, uIds, fId) {
    saveslots.update(sId, {$set: {universityIds: [], professorIds: []}})
    saveslots.update(sId, {$set: {name: name, facultyId: fId}, $push: {universityIds: {$each: uIds}, professorIds: {$each: pIds}}})
  }
})

Meteor.publish({
  saveSlots: function () {
    return saveslots.find({})
  }
})
