import React from 'react';

const Admin = () => {
  return (
    <>
      hiii
      {/* <!-- Add Organisation Model Start--> */}
      {/* <div
        className='modal fade'
        id='addorganisationModal'
        tabIndex={-1}
        aria-labelledby='addorganisationLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog modal-lg'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='addorganisationLabel'>
                Organisation details
              </h5>
              <button
                type='button'
                className='close-model-btn'
                data-bs-dismiss='modal'
                aria-label='Close'
              >
                <i className='uil uil-multiply'></i>
              </button>
            </div>
            <div className='modal-body'>
              <div className='model-content main-form'>
                <div className='row'>
                  <div className='col-lg-12 col-md-12'>
                    <div className='form-group text-center mt-4'>
                      <label className='form-label'>Avatar*</label>
                      <span className='org_design_button btn-file'>
                        <span>
                          <i className='fa-solid fa-camera'></i>
                        </span>
                        <input
                          type='file'
                          id='org_avatar'
                          accept='image/*'
                          name='Organisation_avatar'
                        />
                      </span>
                    </div>
                  </div>
                  <div className='col-lg-12 col-md-12'>
                    <div className='form-group mt-4'>
                      <label className='form-label'>Name*</label>
                      <input
                        className='form-control h_40'
                        type='text'
                        placeholder=''
                        value=''
                      />
                    </div>
                  </div>
                  <div className='col-lg-12 col-md-12'>
                    <div className='form-group mt-4'>
                      <label className='form-label'>Profile Link*</label>
                      <input
                        className='form-control h_40'
                        type='text'
                        placeholder=''
                        value='https://www.barren.com/b/organiser/'
                        disabled
                      />
                    </div>
                  </div>
                  <div className='col-lg-12 col-md-12'>
                    <div className='form-group mt-4'>
                      <label className='form-label'>About*</label>
                      <textarea className='form-textarea' placeholder=''>
                        About
                      </textarea>
                    </div>
                  </div>
                  <div className='col-lg-6 col-md-12'>
                    <div className='form-group mt-4'>
                      <label className='form-label'>Email*</label>
                      <input
                        className='form-control h_40'
                        type='text'
                        placeholder=''
                        value=''
                      />
                    </div>
                  </div>
                  <div className='col-lg-6 col-md-12'>
                    <div className='form-group mt-4'>
                      <label className='form-label'>Phone*</label>
                      <input
                        className='form-control h_40'
                        type='text'
                        placeholder=''
                        value=''
                      />
                    </div>
                  </div>
                  <div className='col-lg-6 col-md-12'>
                    <div className='form-group mt-4'>
                      <label className='form-label'>Website*</label>
                      <input
                        className='form-control h_40'
                        type='text'
                        placeholder=''
                        value=''
                      />
                    </div>
                  </div>
                  <div className='col-lg-6 col-md-12'>
                    <div className='form-group mt-4'>
                      <label className='form-label'>Facebook*</label>
                      <input
                        className='form-control h_40'
                        type='text'
                        placeholder=''
                        value=''
                      />
                    </div>
                  </div>
                  <div className='col-lg-6 col-md-12'>
                    <div className='form-group mt-4'>
                      <label className='form-label'>Instagram*</label>
                      <input
                        className='form-control h_40'
                        type='text'
                        placeholder=''
                        value=''
                      />
                    </div>
                  </div>
                  <div className='col-lg-6 col-md-12'>
                    <div className='form-group mt-4'>
                      <label className='form-label'>Twitter*</label>
                      <input
                        className='form-control h_40'
                        type='text'
                        placeholder=''
                        value=''
                      />
                    </div>
                  </div>
                  <div className='col-lg-6 col-md-12'>
                    <div className='form-group mt-4'>
                      <label className='form-label'>LinkedIn*</label>
                      <input
                        className='form-control h_40'
                        type='text'
                        placeholder=''
                        value=''
                      />
                    </div>
                  </div>
                  <div className='col-lg-6 col-md-12'>
                    <div className='form-group mt-4'>
                      <label className='form-label'>Youtube*</label>
                      <input
                        className='form-control h_40'
                        type='text'
                        placeholder=''
                        value=''
                      />
                    </div>
                  </div>
                  <div className='col-lg-12 col-md-12'>
                    <h4 className='address-title'>Address</h4>
                  </div>
                  <div className='col-lg-6 col-md-12'>
                    <div className='form-group mt-4'>
                      <label className='form-label'>Address 1*</label>
                      <input
                        className='form-control h_40'
                        type='text'
                        placeholder=''
                        value=''
                      />
                    </div>
                  </div>
                  <div className='col-lg-6 col-md-12'>
                    <div className='form-group mt-4'>
                      <label className='form-label'>Address 2*</label>
                      <input
                        className='form-control h_40'
                        type='text'
                        placeholder=''
                        value=''
                      />
                    </div>
                  </div>
                  <div className='col-lg-6 col-md-12'>
                    <div className='form-group main-form mt-4'>
                      <label className='form-label'>Country*</label>
                      <select
                        className='selectpicker'
                        data-size='5'
                        title='Nothing selected'
                        data-live-search='true'
                      >
                        <option value='Algeria'>Algeria</option>
                        <option value='Argentina'>Argentina</option>
                        <option value='Australia'>Australia</option>
                        <option value='Austria'>Austria (Österreich)</option>
                        <option value='Belgium'>Belgium (België)</option>
                        <option value='Bolivia'>Bolivia</option>
                        <option value='Brazil'>Brazil</option>
                        <option value='Canada'>Canada</option>
                        <option value='Chile'>Chile</option>
                        <option value='Colombia'>Colombia</option>
                        <option value='Costa Rica'>Costa Rica</option>
                        <option value='Cyprus'>Cyprus</option>
                        <option value='Czech Republic'>Czech Republic</option>
                        <option value='Denmark'>Denmark</option>
                        <option value='Dominican Republic'>
                          Dominican Republic
                        </option>
                        <option value='Estonia'>Estonia</option>
                        <option value='Finland'>Finland</option>
                        <option value='France'>France</option>
                        <option value='Germany'>Germany</option>
                        <option value='Greece'>Greece</option>
                        <option value='Hong Kong'>Hong Kong</option>
                        <option value='Iceland'>Iceland</option>
                        <option value='India'>India</option>
                        <option value='Indonesia'>Indonesia</option>
                        <option value='Ireland'>Ireland</option>
                        <option value='Israel'>Israel</option>
                        <option value='Italy'>Italy</option>
                        <option value='Japan'>Japan</option>
                        <option value='Latvia'>Latvia</option>
                        <option value='Lithuania'>Lithuania</option>
                        <option value='Luxembourg'>Luxembourg</option>
                        <option value='Malaysia'>Malaysia</option>
                        <option value='Mexico'>Mexico</option>
                        <option value='Nepal'>Nepal</option>
                        <option value='Netherlands'>Netherlands</option>
                        <option value='New Zealand'>New Zealand</option>
                        <option value='Norway'>Norway</option>
                        <option value='Paraguay'>Paraguay</option>
                        <option value='Peru'>Peru</option>
                        <option value='Philippines'>Philippines</option>
                        <option value='Poland'>Poland</option>
                        <option value='Portugal'>Portugal</option>
                        <option value='Singapore'>Singapore</option>
                        <option value='Slovakia'>Slovakia</option>
                        <option value='Slovenia'>Slovenia</option>
                        <option value='South Africa'>South Africa</option>
                        <option value='South Korea'>South Korea</option>
                        <option value='Spain'>Spain</option>
                        <option value='Sweden'>Sweden</option>
                        <option value='Switzerland'>Switzerland</option>
                        <option value='Tanzania'>Tanzania</option>
                        <option value='Thailand'>Thailand</option>
                        <option value='Turkey'>Turkey</option>
                        <option value='United Kingdom'>United Kingdom</option>
                        <option value='United States'>United States</option>
                        <option value='Vietnam'>Vietnam</option>
                      </select>
                    </div>
                  </div>
                  <div className='col-lg-6 col-md-12'>
                    <div className='form-group mt-4'>
                      <label className='form-label'>State*</label>
                      <input
                        className='form-control h_40'
                        type='text'
                        placeholder=''
                        value=''
                      />
                    </div>
                  </div>
                  <div className='col-lg-6 col-md-12'>
                    <div className='form-group mt-4'>
                      <label className='form-label'>City/Suburb*</label>
                      <input
                        className='form-control h_40'
                        type='text'
                        placeholder=''
                        value=''
                      />
                    </div>
                  </div>
                  <div className='col-lg-6 col-md-12'>
                    <div className='form-group mt-4'>
                      <label className='form-label'>Zip/Post Code*</label>
                      <input
                        className='form-control h_40'
                        type='text'
                        placeholder=''
                        value=''
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='co-main-btn min-width btn-hover h_40'
                data-bs-dismiss='modal'
              >
                Cancel
              </button>
              <button
                type='button'
                className='main-btn min-width btn-hover h_40'
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div> */}
      {/* <!-- Add Organisation Model End--></> */}
    </>
  );
};

export default Admin;
