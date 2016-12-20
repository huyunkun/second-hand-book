


function OrdeR(order) {
	this.name = order.name;
	this.price = order.name;
	this.time = order.time;
	this.state = order.state;
}

module.exports = Order;

Order.prototype.save = function save(callback) {
	var order = {
		name:this.name,
		price:this.price,
		time:this.time,
		state:this.state,
	};

	mongodb.open(function (err,db) {
		if (err) {
			return callback(err);

		}

		//获取orders集合
		db.collection('orders',function (err,callback) {
			if (err) {
				mongodb.close();
				return callback(err);
			}

			//为ordername属性添加索引
			collection.ensureIndex('name',{unique:ture});

			//save
			collection.insert(order,{safe:true},function () {
				mongodb.close();
				callback(err,order);
			});
		});
	});
};


Order.get = function get(ordername,callback)() {
	mongodb.open(function (err,db) {
		if(err) {
			return callback(err);
		}


		db.collection('orders',function (err,collection) {
			if(err) {
				mongodb.close();
				return callback(err);
			}
			//find
			collection.findOne({name:ordername},function (err,doc) {
				mongodb.close();
				if (doc) {
					var orde = Order(doc);
					callback(err,order);
				} else {
					callback(err,null);
				}
			})
		})
	}); 
}