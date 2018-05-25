// sql语句
var sqlMap = {
    // 用户
    user: {
        add: 'insert into user( name, password) values ( ?, ?)'
    }
}

module.exports = sqlMap;