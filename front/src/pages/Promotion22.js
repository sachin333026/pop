import React from 'react';
import {useState,useEffect} from 'react'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import SwipeableViews from 'react-swipeable-views';
import Promotion from '../pages/Promotion';

  
  
 

const styles = {
  tabs: {
    marginTop:'13px',
    background: '#fff',
  },
  slide: {
    padding: 15,
    minHeight: 100,
     
  },
  slide1: {
    backgroundColor: '',
  },
  slide2: {
    backgroundColor: '',
  },
 
};


 
class Promotion22  extends React.Component {
  
  state = {
    index: 0,
  };
 
 

  handleChange = (event, value) => {
    this.setState({
      index: value,
    });
  };

  handleChangeIndex = index => {
    this.setState({
      index,
    });
  };
 
  render() {
    
    const { index } = this.state;
    const t1=this.props.Level1;
    const c1=this.props.Level1c; 
    const t2=this.props.Level2;
    const c2=this.props.Level2c;
 
    return (
        
       
     
      <div>
        <Tabs variant="fullWidth"  TabIndicatorProps={{
style: {
  backgroundColor: "#0288d1"
 }
}} value={index}  onChange={this.handleChange} style={styles.tabs}>
          <Tab label="Level 1" />
          <Tab label="Level 2" />
         
        </Tabs>
        <SwipeableViews index={index} onChangeIndex={this.handleChangeIndex}>
          <div style={Object.assign({}, styles.slide, styles.slide1)}><div class="mt-1">
      <div class="tab-content">
      
        <div class="tab-pane fade active show">
        <div class="row">
        <div class="col-6">
        <div class="mb-3">
                <div class="text-center">
                <span style={{fontWeight:'400'}}>Total People</span>
                    <h5 style={{fontWeight:'450' ,marginTop:'5px'}}>
                    {t1}</h5>
                </div>
            </div>
        </div> 
        <div class="col-6">
        <div class="mb-3">
                <div class="text-center">
                   
                <span style={{fontWeight:'400'}}>Contribution</span>
                    <h5 style={{fontWeight:'450',marginTop:'5px'}}>
                    ₹ {c1} </h5>
                </div>
            </div>
        </div>   
        </div>
        </div>  
        </div>
        </div>
    </div>
          <div style={Object.assign({}, styles.slide, styles.slide2)}><div class="mt-1">
      <div class="tab-content">
      
        <div class="tab-pane fade active show">
        <div class="row">
        <div class="col-6">
        <div class="mb-3">
        <div class="text-center">
                    <span style={{fontWeight:'400'}}>Total People</span>
                    <h5 style={{fontWeight:'450',marginTop:'5px'}}>
                    {t2}</h5>
                </div>
            </div>
        </div> 
        <div class="col-6">
        <div class="mb-3">
        <div class="text-center">
                   
        <span style={{fontWeight:'400'}}>Contribution</span>
                   <h5 style={{fontWeight:'450',marginTop:'5px'}}>
                   ₹ {c2} </h5>
               </div>
            </div>
        </div>   
        </div>
        </div>  
        </div>
        </div>
    </div>
     
        </SwipeableViews>
      </div>
    );
  }









 










}

 
export default Promotion22;
 