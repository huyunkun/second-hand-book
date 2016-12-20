

function SitE(site) {
	this.name = site.name;
	this.address = site.address;
	this.phone = site.phone;
};

module.exports = Site;

Site.prototype.save = function save(callback) {
	var site = {
		name:this.name,
		address:this.address,
		phone:this.phone,
	};

	mongodb.open(function (err,db) {
		if (err) {
			return callback(err);
		}

		//获取sites集合
		db.collection('sites',function (err,callection) {
			if (err) {
				mongodb.close();
				return callback(err);
			}

			//为name属性添加索引
			collection.ensureIndex('name',{unique:ture});


			//SAVE
			collection.insert(site,{safe:true},function () {
				mongodb.close();
				callback(err,site);
			});
		});
	});
};

Site.get = function get(sitename,callback) {
	mongodb.open(function (err,db) {
		if (err) {
			return callback(err);
		}
        

        db.collection('sites', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
		//find
		collection.findOne({name:sitename},function (err,doc) {
			mongodb.close();
			if (doc) {
				var sit =  Site(doc);
				callback(err,site);
			} else {
				callback(err,null);
			}
		});
	});
}