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
  'professorIds' : {
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
  for (var i=0; i<8; i++) {
    saveslots.insert({})
  }
}

Meteor.methods({
  setSaveSlot: function (sId, pIds, name, uIds, fId) {
    var curr = saveslots.findOne({_id: sId})
    saveslots.update(sId, {$pullAll: {universityIds: curr.universityIds, professorIds: curr.professorIds}})
    saveslots.update(sId, {$set: {name: name, facultyId: fId}, $push: {universityIds: {$each: uIds}}})
    if (0 in pIds) {
      console.log('haha')
      saveslots.update(sId, {$push: {professorIds: pIds}})
    }
  }
})

Meteor.publish({
  saveSlots: function () {
    return saveslots.find({})
  }
})
