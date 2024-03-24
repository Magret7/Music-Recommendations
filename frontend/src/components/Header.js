export default function Header() {
    return (
        <div class="container-fluid sticky-top bg-white">
            <header class="d-flex flex-wrap align-items-center justify-content-md-between py-2 mb-4 border-bottom border-dark border-1">
                <nav class="navbar sticky-top">
                    {/* <div class="navbar-brand"> TODO: What was this doing before?  It doesn't have a closing tag in the header.html*/}
                    <img
                        src={require('../assets/images/music-icon.png')}  // TODO: Why does this need "require" to work?
                        width="45"
                        height="45"
                        class="d-inline-block align-top"
                        alt=""
                    />{" "}
                    <b style={{ fontSize: "1.75rem" }}> MusicRecommendations</b>
                </nav>

                {/* <form class="col-md-3 text-end" role="search">
            <input type="search" class="form-control form-control-dark text-bg-light" placeholder="Search..." aria-label="Search">
        </form> */}

                <div class="col-md-3 text-end">
                    <button type="button" class="btn btn-primary">
                        My Profile
                    </button>
                </div>
            </header>
        </div>
    );
}
