"use strict";
const mocha = require('mocha');
const assert = require('assert');
const sinon = require('sinon');
const rewire = require('rewire');

const helper = require('./helper.js');
const helperNonExported = rewire('./helper.js');
const helperStub = require('./helpers.stub.js');

const nodeEnv = process.env.NODE_ENV || 'development';

describe('helper', function () {
  let db;
  before(function () {
        db = {
            get: function (collection) {
                return this.collections[collection]
            },
            collections: {
                favouriteList: {
                    find: () => {
                    
                    },
                },
                userFavouriteList:{
                	find:() => {

                	}
                }
            }
        };
    });
    it('getFavouriteList-success', function (done) {
        const favouriteList = db.get('favouriteList');
        sinon.stub(favouriteList, 'find')
            .yields(null, [{"repoName":"abc","description":"repo for abc"},{"repoName":"efg","description":"repo for efg"}]);


        helper.getFavouriteList(db)
            .then((result) => {
                assert.equal(JSON.stringify(result), JSON.stringify(helperStub.getFavourite.succes));
                done();
            }).catch((err) => {
                done();
            })
        favouriteList.find.restore()
    });
    it('getFavouriteList-data not present', function (done) {
        const favouriteList = db.get('favouriteList');
        sinon.stub(favouriteList, 'find')
            .yields(null, {code: "DNP", msg: "Data is not present"});


        helper.getFavouriteList(db)
            .then((result) => {
                assert.equal(JSON.stringify(result), JSON.stringify(helperStub.getFavourite.notPresent));
                done();
            }).catch((err) => {
                done();
            })
        favouriteList.find.restore()
    });
    it('getFavouriteList-error', function (done) {
        const favouriteList = db.get('favouriteList');
        sinon.stub(favouriteList, 'find')
            .yields({code: "SE", msg: "Please try after some time"},null);


        helper.getFavouriteList(db)
            .then((result) => {
                done();    
            }).catch((err) => {
            	assert.equal(JSON.stringify(err),JSON.stringify({code: "SE", msg: "Please try after some time"}));
            }).then(done,done)
        favouriteList.find.restore()
    });
    it('getUserFavouriteList-success', function (done) {
        const userFavouriteList = db.get('userFavouriteList');
        sinon.stub(userFavouriteList, 'find')
            .yields(null, [{"repoName":"abc","description":"repo for abc"},{"repoName":"efg","description":"repo for efg"}]);


        helper.getUserFavouriteList("abc",db)
            .then((result) => {
                assert.equal(JSON.stringify(result), JSON.stringify(helperStub.getFavourite.succes));
                done();
            }).catch((err) => {
                done();
            })
        userFavouriteList.find.restore()
    });
    it('getUserFavouriteList-data not present', function (done) {
        const userFavouriteList = db.get('userFavouriteList');
        sinon.stub(userFavouriteList, 'find')
            .yields(null, {code: "DNP", msg: "Data is not present"});


        helper.getUserFavouriteList("abc",db)
            .then((result) => {
                assert.equal(JSON.stringify(result), JSON.stringify(helperStub.getFavourite.succes));
                done();
            }).catch((err) => {
                done();
            })
        userFavouriteList.find.restore()
    });
    

})