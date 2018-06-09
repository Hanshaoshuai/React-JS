import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.less';
import { Carousel, WingBlank, Button, WhiteSpace } from 'antd-mobile';
//import MainLayout from '../components/MainLayout/MainLayout';

function IndexPage({ location,name }) {
  return (
      <div className={styles.normal}>
        <h1 className={styles.title}>这是怎么回事!</h1>
        <h1 className={styles.title}>哦我知道了</h1>
        {name}
        <div className={styles.welcome} />
        <ul className={styles.list}>
          <li>To get started, edit <code>src/index.js</code> and save to reload.</li>
          <li><a href="https://github.com/dvajs/dva-docs/blob/master/v1/en-us/getting-started.md">Getting Started</a></li>
        </ul>
        <Button type="primary">primary</Button>
    		<Button type="primary" disabled>primary disabled</Button>
      </div>
  );
}

function mapStateToProps(state) {
  const { name } = state.users;
  return {
    name,
  }
}

IndexPage.propTypes = {
};

export default connect(mapStateToProps)(IndexPage);