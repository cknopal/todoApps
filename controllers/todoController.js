var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://admin:admin1@ds143451.mlab.com:43451/todoapps', { useNewUrlParser: true });

var todoSchema = new mongoose.Schema({
    item:String
});

var Todo = mongoose.model('Todo',todoSchema);

// var data = [ { item:'item 1' },{ item:'item 2' },{ item: 'item 3' } ];
var urlendcodedParser = bodyParser.urlencoded({extended:false});

module.exports = function(app){

app.get('/todo',function(req,res){
    Todo.find({},function(err,data){
        if(err) throw err;
        res.render('todo', { todos:data } );
    });
    
});

app.post('/todo',urlendcodedParser,function(req,res){
    var newTodo = Todo(req.body).save(function(err,data){
        if(err) throw err;
        res.json(data);
    });
});

app.delete('/todo/:item',function(req,res){
    Todo.find({item:req.params.item.replace(/\-/g," ")}).remove(function(err,data){
        if (err) throw err;
        res.json(data);
    });
});

};