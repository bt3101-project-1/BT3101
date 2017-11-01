import SimpleSchema from 'simpl-schema';

crawlrequests = new Meteor.Collection('crawlrequests');

crawlrequests.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

const crawlrequestSchema = new SimpleSchema({
  timeStampStart: {
    type: Date,
    // autoValue: function() {
    //   if (!this.isUpdate) {
    //     return new Date();
    //   }
    // }
  },
  timeStampEnd: {
    type: Date,
    // autoValue: function () {
    //   if (this.isUpdate) {
    //     if (this.field('status').value.every(e => e)) {
    //       return new Date();
    //     } else {
    //       this.unSet()
    //     }
    //   }
    // },
    optional: true
  },
  status: {
    type: Array,
    defaultValue: [0, 0, 0]
  },
  'status.$': {
    type: Number
  },
  facultyUrl: {
    type: String
  },
  universityId: {
    type: String
  },
  facultyId: {
    type: String
  },
  professorIds: {
    type: Array,
    defaultValue: []
  },
  'professorIds.$': {
    type: String
  }
});

crawlrequests.attachSchema(crawlrequestSchema);

Meteor.methods({
  createCrawlRequest: function(fUrl, uId, fId) {
    crawlrequests.insert({facultyUrl: fUrl, universityId: uId, facultyId: fId, timeStampStart: new Date()})
  },
  createCrawlRequests: function(fUrls, uIds, fId) {
    if (fUrls.length !== uIds.length) {
      throw new Meteor.Error('Faculty URLs', 'All Faculty URLs must be filled')
    }
    for (var i=0; i<uIds.length; i++) {
      if (universities.findOne({_id: uIds[i]}) === undefined) {
        uIds[i] = universities.insert({name: uIds[i]})
      }
    }
    if (faculties.findOne({_id: fId}) === undefined) {
      fId = faculties.insert({name: fId})
    }
    for (i in fUrls) {
      crawlrequests.insert({facultyUrl: fUrls[i], universityId: uIds[i], facultyId: fId, timeStampStart: new Date()})
    }
  }
})

Meteor.publish({
  allCrawlRequests: function () {
    return crawlrequests.find({})
  }
})
