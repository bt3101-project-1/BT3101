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
  name: {
    type: String,
    defaultValue: '(blank)'
  },
  universityIds: {
    type: Array,
    defaultValue: []
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
  setSaveSlot: function (sId, opt) {
    saveslots.update(sId, {$set: opt})
  }
})

Meteor.publish({
  saveSlots: function () {
    return saveslots.find({})
  }
})
