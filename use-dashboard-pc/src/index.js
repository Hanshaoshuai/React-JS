import dva from 'dva';
import createLoading from 'dva-loading';
import './index.html';
import './index.css';

// 1. Initialize
const app = dva();

// 2. Plugins
app.use(createLoading());

// 3. Model
app.model(require('./models/users'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');


// "lint": "eslint --ext .js src test",
//  "precommit": "npm run lint"
// 上面两行注释的需要加到package.js中
