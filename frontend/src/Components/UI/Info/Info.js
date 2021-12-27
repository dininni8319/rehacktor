import classes from './Info.module.css';

export default function Info() {
    return (
        <>
          <div className={'container-fluid my-5' + classes["bg-info"]}>
              <div className="container">
                  <div className={"row px-3 pt-5" + classes.info}>
                  <div className="col-12 col-lg-4 my-5 px-3">
                          <h3 className={'text-main' + classes['info-title']}>
                              Register Now
                          </h3>
                          <p className='pt-2'>Register now, it's totally free!</p>
                      </div>
                      <div className="col-12 col-lg-4 my-5 px-3">
                          <h3 className={'text-main' + classes['info-title']}>
                              Choose your game..
                          </h3>
                          <p className='pt-2'>Choose a game you possess and start playing.</p>
                      </div>
                      <div className="col-12 col-lg-4 my-5 px-3">
                          <h3 className={'text-main' + classes['info-title']}>
                              ... start your stream!
                          </h3>
                          <p className='pt-2'>Share your game experience with your friends!</p>
                      </div>
                  </div>
              </div>
          </div>
        </>
    )
}