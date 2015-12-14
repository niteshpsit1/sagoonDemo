var express = require('express'),
    router = express.Router(),
    Users = require('../models/user'),
    Tasks = require('../models/task'),
    bcrypt = require('bcryptjs'),
    Promise	= require('q');

router.get('/',function(req, res){
	res.render('index');
});

router.get('/task',function(req, res){
	sess=req.session;
	if(true)
	{
		Tasks.find({}).populate('created_by').exec(function(err, tasks) {
    		var tasksData = [];
    		for(var i =0; i<tasks.length; i++){
    			var task = {}
    			task.name = tasks[i]['created_by']['name'];
    			task.todo = tasks[i].todo;
    			tasksData.push(task);
    		}
    		res.send({data:tasksData, message: "ok"});
		});
	}
	else{
		res.send({message:"please login to see the tasks"});
	}
});

router.post('/task',function(req, res){
	sess=req.session;
	if(sess.email){
		(new Tasks(req.body)).save()
		.then(function(data){
			if (data) {
				res.send({data:'task added to the list',message:'ok'});
			}
			else {
				res.send({message:'error'});
			}
		},function(error){
			res.send({message:'someThing goes Wrong sorry'});
		});
	}
	else{
		res.send({message:"please login to add the tasks"});
	}
});

router.post('/login',function(req, res){
	Users.findOne({email: req.body.email})
	.then(function(data, error){
		if(error){
			res.send({message:"someThing went Wrong sorry"});
		}
		else if(data){
			comparePasswordToHash(req.body.password, data.password)
			.then(function(matchValue){
				if(matchValue == 'matched') {
					sess=req.session;
					sess.email=req.body.email;
					res.send({data:data, message:'ok'});
				}
				else if(matchValue == 'unmatched')
					res.send({message:"password not match please enter correct password"});
				else {
					res.send({message:"someThing went Wrong sorry"});
				}
			})
			.catch(function(error){
				console.log(error);
				res.send({message:"someThing went Wrong sorry"});
			});
		}
		else{
			res.send({message:"user not found please enter valid eamil"});
		}
	});

});

router.post('/logout',function(req, res){
	req.session.destroy(function(err)
	{
		if(err){
			res.send({message:"someThing goes Wrong sorry"});		
		}
		else
		{
			res.send({message:"ok"});
		}
	});
});

router.post('/signup',function(req, res){

	convertPasswordToHash(req.body.password)
	.then(function(data){
		req.body.password = data;
		(new Users(req.body)).save()
		.then(function(data){
			if (data) {
				res.send({data:data, message:'ok'});
			}
			else {
				res.send({message:'error'});
			}
		},function(error){
			res.send({message:'user alredy exist or invalid email'});
		});	
	})
	.catch(function(err){
		res.send({message:'someThing went Wrong oooopps'});
	})

});

router.get('/isLogin',function(req, res){
	sess = req.session;
	if(sess.email){
		Users.findOne({email:req.session.email})
		.then(function(data){
			res.send({data:data, message:'ok'});
		},function(error){
			res.send({message:'someThing goes Wrong sorry'});
		})
	}
	else{
		res.send({message: "not login"})
	}
	
});

function convertPasswordToHash(password){
	var deferred  =	Promise.defer();
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(password, salt, function(err, hash) {
	        if(hash) {
	        	deferred.resolve(hash);
	        }
	        else {
	        	deferred.reject('not convert');
	        }
	    });
	});
	return deferred.promise;
}

function comparePasswordToHash(password, hash){
	var deferred  =	Promise.defer();
	bcrypt.compare(password, hash, function(error, res) {
    	if(res){
    		return deferred.resolve('matched');
    	}
    	else if(error){
    		return deferred.reject(error)
    	}
    	else{
    		return deferred.resolve('unmatched');
    	}
	});
	return deferred.promise;
}

module.exports = router;