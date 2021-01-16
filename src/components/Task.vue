<template>
  <div>
    <div class ="make">
      <input type="text" v-model="newTodoName"  placeholder="購入物品を記入" >

      <select v-model="newCompanyType">
      <option disabled value="">購入先を選択</option>
      <option v-for="company in optionCompanies" v-bind:value="company.name" v-bind:key="company.id">{{ company.name }}</option>
      </select>

      <select v-model="newBudget">
      <option disabled value="">予算を選択</option>
      <option v-for="budget in optionBudget" v-bind:value="budget.name" v-bind:key="budget.id">{{ budget.name }}</option>
      </select>

      <button type="submit" v-on:click="createTodo()">物品登録</button>
    </div>

    <div class = "search">
      状況：
      <select name:="status" v-model="showTodoType">
      <option value="all">すべて</option>
      <option v-for="status in optionStatus" v-bind:value="status.name" v-bind:key="status.id">{{ status.name }}</option>
      </select>
    </div>

    <!-- todoの一覧表示 -->
    <div class="tasks">
      <div class="task" v-for="(todo, key) in filteredTodos" :key="todo.id" >
          <div :class="[todo.active ==0 ? 'status0' : todo.active ==1  ? 'status1': todo.active ==2  ? 'status2':
          todo.active ==3  ? 'status3': todo.active ==4  ? 'status4': todo.active ==5  ? 'status5': 'status0']"></div>
          物品内容：{{todo.name}}<br>
          購入先：{{todo.company}}<br>
          予算：{{todo.budget}}<br>
          状況：
          <select name:="status" v-model="todo.status" v-on:change="updateStatus(todo, key)">
          <option v-for="status in optionStatus" v-bind:value="status.name" v-bind:key="status.id">{{ status.name }}</option>
          </select><br>
          <button type="submit" v-on:click="deleteTodo(key)">×</button>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "Task",
  data() {
    return {
      database: null,
      todosRef: null,
      newTodoName: "",
      newCompanyType: "",
      newBudget: "",
      showTodoType: "all",
      todos: [],

      optionCompanies: [
          { id: 1, name: '会社1' },
          { id: 2, name: '会社2' },
          { id: 3, name: '会社3' }
      ],

      optionBudget: [
          { id: 1, name: '予算1' },
          { id: 2, name: '予算2' },
          { id: 3, name: '予算3' }
      ],

      optionStatus: [
          { id: 1, name: '見積り待ち' },
          { id: 2, name: '見積り完了' },
          { id: 3, name: '発注待ち' },
          { id: 4, name: '発送待ち' },
          { id: 5, name: '検収待ち' },
          { id: 6, name: '完了' },
      ],



    };
  },

  /* eslint-disable */
  created: function() {
    this.database = firebase.database();
    this.uid = firebase.auth().currentUser.uid;
    this.todosRef = this.database.ref("todos/");

    var _this = this;
    // データに変更があると実行されるfunction
    this.todosRef.on("value", (snapshot) => {
      this.todos = snapshot.val(); // 再取得してtodosに格納する
    });
  }
  /* eslint-disable */
  ,

  computed: {
    // フィルターの実装showTodoTypeが変更されると実行される
    filteredTodos: function() {
      if (this.showTodoType == "all") {
        return this.todos;
      } else {
        var filterTodos = {};
        for (var key in this.todos) {
          var todo = this.todos[key];
          if (todo.status == this.showTodoType) {
            filterTodos[key] = todo;
          }
        }
        return filterTodos;
      }
    }
  },

  methods: {
    // DBのtodos以下にデータを格納していく
    createTodo: function() {
      if (this.newTodoName == "" || this.newCompanyType == "" || this.newBudget == "") {
        return;
      }
      this.todosRef.push({
        name: this.newTodoName,
        company: this.newCompanyType,
        budget: this.newBudget,
        isComplete: false,
        status: '見積り待ち',
        active: 0
      });
      this.newTodoName = "";
    },

    // 完了・未完了の値の更新
    updateIsCompleteTodo: function(todo, key) {
      todo.isComplete = !todo.isComplete;
      var updates = {};
      updates[key] = todo;
      this.todosRef.update(updates)
    },

    // ステータスの更新
    updateStatus: function(todo, key) {
      switch (todo.status){
        case '見積り待ち':
        todo.active=0;
        break;
        case '見積り完了':
        todo.active=1;
        break;
        case '発注待ち':
        todo.active=2;
        break;
        case '発送待ち':
        todo.active=3;
        break;
        case '検収待ち':
        todo.active=4;
        break;
        case '完了':
        todo.active=5;
        break;
        default:
        break;
      }
      var updates = {};
      updates[key] = todo;
      this.todosRef.update(updates)
    },

    // todoの削除
    deleteTodo: function(key) {
      this.todosRef.child(key).remove();
    }
  }
};
</script>

<style>
ul{
  list-style: none;
}

/*---------------作成フォーム--------------------------------*/
.make{
  margin: 1% 0%;
}

.make input{
  border: none;
  border-bottom: solid 2px;
  background-color: #90ee90;
  margin: 0px 10px;
  font-size: 18px;
  outline: none;
}

.make select{
  border: none;
  border-bottom: solid 2px;
  background-color: #90ee90;
  margin: 0px 10px;
  font-size: 18px;
  outline: none;
}

.make button{
  border: solid 2px #006400;
  border-radius:20px;
  background-color: #90ee90;
  margin: 0px 10px;
  padding: 0px 10px;
  font-size: 18px;
  outline: none;
}

/*---------------検索フォーム--------------------------------*/
.search{
  margin: 1% 0%;
  font-size: 18px;
}

.search select{
  border: none;
  border-bottom: solid 2px;
  background-color: #90ee90;
  margin: 0px 10px;
  font-size: 18px;
  outline: none;
}


/*-----------------タスク--------------------------------*/
.tasks {
  width: 100%;
  background-color: #90ee90;
}

.task{
  width: 20%;
  margin: 2% 2%;
  padding: 1.5% 0%;
  float: left;
  position: relative;
  background-color: #fffaf0;
  box-shadow: 10px 10px rgba(0,0,0,0.3);
}

.task button{
position: absolute;
    right: 0;
    top: 0;
    border: none;
    font-size: 30px;
    background-color: #ff7450;
    outline: none;
}

.task select{
    border: none;
    border-bottom: solid 2px;
    background-color: #fffaf0;
    font-size: 15px;
    outline: none;
}

/*-----------------状況表示----------------*/
/*見積り待ち（赤）*/
.status0 {
  position: absolute;
  top: 0;
  left: 0;
  border-left: 40px solid #ff0000;
  border-bottom: 40px solid transparent;
}

/*見積り完了（朱色）*/
.status1 {
  position: absolute;
  top: 0;
  left: 0;
  border-left: 40px solid #ffa07a;
  border-bottom: 40px solid transparent;
}

/*発注待ち（橙）*/
.status2 {
  position: absolute;
  top: 0;
  left: 0;
  border-left: 40px solid #ff8c00;
  border-bottom: 40px solid transparent;
}

/*発送待ち（黄）*/
.status3 {
  position: absolute;
  top: 0;
  left: 0;
  border-left: 40px solid #ffee00;
  border-bottom: 40px solid transparent;
}

/*検収待ち（黄緑）*/
.status4 {
  position: absolute;
  top: 0;
  left: 0;
  border-left: 40px solid #00ff00;
  border-bottom: 40px solid transparent;
}

/*完了（緑）*/
.status5 {
  position: absolute;
  top: 0;
  left: 0;
  border-left: 40px solid #32cd32;
  border-bottom: 40px solid transparent;
}

</style>
