import classes from "./Footer.module.css";

export default function Footer() {
  return (
    // <div className={"container-fluid pb-2 position-relative bg-cyan" + classes.borderGradTop}>Hello
    // World!</div>
    <div
      className={`${"container-fluid"} ${"pb-2"} ${"position-relative"} ${"bg-cyan"} ${
        classes.borderGradTop
      } ${"bg-breen-light"}`}
    >
      <div className={`${classes.footerBox} ${"position-absolute"}`}></div>
      <div
        className={`${"row"} ${"py-3"} ${"px-md-5"} ${"justify-content-between"} ${"align-items-center"}`}
      >
        <div className="col-12">
          <div className="font-exan text-main">rehacktor</div>
        </div>
      </div>
      <div className="row px-md-5">
        <div className="col-12 col-md-4 py-3 py-md-5">
          <p className="small mb-0">
            Explore a vast catalog of video games, register and let your friends
            watch your games.
          </p>
        </div>
        <div className="col-12 col-md-4 py-3 py-md-5">
          <p className="small mb-0">Made in HackJS for Aulab - 2021.</p>
        </div>
        <div className="col-12 col-md-4 py-3 py-md-5">
          <h3>Link Social</h3>
          <ul className="d-flex list-style-none" style={{ listStyle: "none" }}>
            <li>
              <a
                href="https://www.aulab.it"
                className="text-decoration-none text-white me-3"
              >
                Aulab
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com"
                className="text-decoration-none text-white me-3"
              >
                Facebook
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com"
                className="text-decoration-none text-white me-3"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href="https://www.twitter.com"
                className="text-decoration-none text-white me-3"
              >
                Twitter
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
