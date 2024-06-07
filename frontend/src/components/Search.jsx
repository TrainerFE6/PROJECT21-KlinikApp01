import React from 'react';

const Search = () => {
  return (
    <div className="container-fluid bg-primary my-5 py-5">
      <div className="container py-5">
        <div className="text-center mx-auto mb-5" style={{ maxWidth: '500px' }}>
          <h5 className="d-inline-block text-white text-uppercase border-bottom border-5">Find A Doctor</h5>
          <h1 className="display-4 mb-4">Find A Healthcare Professional</h1>
          <h5 className="text-white fw-normal">Duo ipsum erat stet dolor sea ut nonumy tempor. Tempor duo lorem eos sit sed ipsum takimata ipsum sit est. Ipsum ea voluptua ipsum sit justo</h5>
        </div>
        <div className="mx-auto" style={{ width: '100%', maxWidth: '600px' }}>
          <div className="input-group">
            <select className="form-select border-primary w-25" style={{ height: '60px' }}>
              <option selected>Department</option>
              <option value="1">Department 1</option>
              <option value="2">Department 2</option>
              <option value="3">Department 3</option>
            </select>
            <input type="text" className="form-control border-primary w-50" placeholder="Keyword" />
            <button className="btn btn-dark border-0 w-25">Search</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
