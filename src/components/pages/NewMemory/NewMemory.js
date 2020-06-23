import React from 'react';

import authData from '../../../helpers/data/authData';
// import categoriesData from '../../../helpers/data/categoriesData';
import memoriesData from '../../../helpers/data/memoriesData';
import './NewMemory.scss';

class NewMemory extends React.Component {
  state = {
    memoryName: '',
    memoryDate: '',
    memoryLocation: '',
    memoryCategoryId: '',
    memoryNotes: '',
    memoryTripId: '',
    categories: [],
  }

  // componentDidMount() {
  //   categoriesData.getCategories()
  //     .then((catsArray) => this.setState({ categories: catsArray }))
  //     .catch((err) => console.error('could not get categories upon mount', err));
  // }

  nameChange = (e) => {
    e.preventDefault();
    this.setState({ memoryName: e.target.value });
  }

  dateChange = (e) => {
    e.preventDefault();
    this.setState({ memoryDate: e.target.value });
  }

  locationChange = (e) => {
    e.preventDefault();
    this.setState({ memoryLocation: e.target.value });
  }

  categoryChange = (e) => {
    e.preventDefault();
    this.setState({ memoryCategoryId: e.target.checked });
  }

  notesChange = (e) => {
    e.preventDefault();
    this.setState({ memoryNotes: e.target.value });
  }

  tripIdChange = (e) => {
    e.preventDefault();
    this.setState({ memoryTripId: e.target.value });
  }

  saveMemory= (e) => {
    e.preventDefault();
    const {
      memoryName,
      memoryDate,
      memoryLocation,
      memoryCategoryId,
      memoryNotes,
      memoryTripId,
    } = this.state;

    const newMemory = {
      name: memoryName,
      date: memoryDate,
      location: memoryLocation,
      categoryId: memoryCategoryId,
      Notes: memoryNotes,
      tripId: memoryTripId,
      uid: authData.getUid(),
    };

    memoriesData.postNewMemory(newMemory)
      .then(() => this.props.history.push('/trips'))
      .catch((err) => console.error('could not post new memory:', err));
  };

  render() {
    const {
      memoryName,
      memoryDate,
      memoryLocation,
      memoryCategoryId,
      memoryNotes,
      memoryTripId,
      // categories,
    } = this.state;

    return (
      <div className="NewTrip col-12">
      <h3>New Memory</h3>
      <form className="col-6 offset-3">
      <div className="form-group">
        <label htmlFor="memory-name">Memory Name</label>
        <input type="text" placeholder="Rockclimbing, Tiki Bar, etc..." className="form-control" id="memory-name" value={memoryName} onChange={this.nameChange} aria-describedby="memNameHelp"/>
      </div>

      <div className="form-check">
        <input className="form-check-input" type="radio" name="exampleRadios" id="memoryCategoryId" checked="category1" onChange={this.categoryChange}/>
        <label className="form-check-label" for="FoodDrink">
          Food & Drink
        </label>
      </div>
      <div className="form-check">
        <input className="form-check-input" type="radio" name="exampleRadios" id="memoryCategoryId" checked="category2" onChange={this.categoryChange}/>
        <label className="form-check-label" for="FoodDrink">
          Adventure
        </label>
      </div>

      <div className="form-group">
        <label htmlFor="memory-date">Date</label>
        <input type="text" placeholder="MM/DD/YYYY" className="form-control" id="memory-date" value={memoryDate} onChange={this.dateChange} aria-describedby="memDateHelp"/>
      </div>
      <div className="form-group">
        <label htmlFor="memory-location">Location</label>
        <input type="text" placeholder="place, neighborhood, etc..." className="form-control" id="memory-location" value={memoryLocation} onChange={this.locationChange} aria-describedby="memLocationHelp"/>
      </div>

      <div className="form-group">
        <label htmlFor="memory-notes">Notes</label>
        <input type="text" placeholder="This was awesome because..." className="form-control" id="memory-notes" value={memoryNotes} onChange={this.notesChange} aria-describedby="memNotesHelp"/>
      </div>

      <button type="submit" className="btn btn-primary" onClick={this.saveMemory}>Submit</button>
    </form>
      </div>
    );
  }
}

export default NewMemory;
