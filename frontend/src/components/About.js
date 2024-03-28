export default function About() {
    const developers = [
        {
            firstName: "Magret",
            lastName: "Adekunle",
            bio: "Magret is a senior at UT Austin majoring in Math and African & American Diaspora Studies.",
            role: "Group Leader: FullStack development with Flask, Python, Bootstrap, & etc.",
            img: "https://mdbcdn.b-cdn.net/img/new/standard/city/041.webp",
            commits: 33,
            issues: 18,
            tests: 0,
            gitlabProfile: 'https://gitlab.com/magretadekunle'
        },
        {
            firstName: "George",
            lastName: "Mathew",
            bio: "George is a senior at UT Austin studying Biomedical Engineering and pursuing a Master's in Data Science after his graduation.",
            role: "Backend development with Flask and Python.",
            img: "https://mdbcdn.b-cdn.net/img/new/standard/city/042.webp",
            commits: 20,
            issues: 0,
            tests: 6,
            gitlabProfile: 'https://gitlab.com/georgegmathew12'
        },
        {
            firstName: "Holly",
            lastName: "Luebsen",
            bio: "Holly is a junior at UT Austin studying Mathematics and pursuing certificates in German, Elements of Computing and Science Communication.",
            role: "Backend and Frontend development (tbd)",
            img: "https://mdbcdn.b-cdn.net/img/new/standard/city/043.webp",
            commits: 24,
            issues: 0,
            tests: 0,
            gitlabProfile: 'https://gitlab.com/hollyrl108'
        },
        {
            firstName: "Ryan",
            lastName: "Mullowney",
            bio: "Ryan is a software developer for UT's fundraising department, and enrolls in CS courses to broaden his skillset and fill in gaps in knowledge. He has a Bachelor's in History & Philosophy.",
            role: "Front-end development with HTML, Bootstrap, and React",
            img: "https://mdbcdn.b-cdn.net/img/new/standard/city/044.webp",
            commits: 30,
            issues: 11,
            tests: 0,
            gitlabProfile: 'https://gitlab.com/rwmullowney'
        },
        {
            firstName: "Jack",
            lastName: "Yeung",
            bio: "Jack is a senior at UT Austin studying Biomedical Engineering pursuing the Elements of Computing Certificate.",
            role: "Backend and Frontend Development (TBD)",
            img: "https://mdbcdn.b-cdn.net/img/new/standard/city/046.webp",
            commits: 11,
            issues: 0,
            unitTests: 3,
            gitlabProfile: 'https://gitlab.com/jackyeung1'
        },
    ]

    const developersMap = developers.map((developer) => {
        return (
            <>
                <div className="col">
                    <div className="card h-100">
                        <img src={developer.img} className="card-img-top"
                            alt={`${developer.firstName} ${developer.lastName}`} />
                        <div className="card-body">
                            <h4 className="card-title">{developer.firstName} {developer.lastName}</h4>
                            <p className="card-text"><b>Bio:</b> {developer.bio}</p>
                            <p className="card-text"><b>Main role: </b> {developer.role} </p>
                            <p className="card-text"><b>Commits by Magret: </b>{developer.commits}</p>
                            <p className="card-text"><b>Issues Created: </b>{developer.issues}</p>
                            <p className="card-text"><b>Unit Tests: </b>{developer.unitTests}</p>
                            <a href={developer.gitlabProfile} target="_blank" rel="noopener noreferrer" className="btn btn-primary">{developer.firstName}'s Profile</a>
                        </div>
                    </div>
                </div>
            </>
        )
    })


    return (
        <div className="row">
            <h1 style={{ textAlign: "center" }}>About Page</h1>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-lg-5 mb-5">
                {developersMap}
            </div>

            <section>
                <h2 className="display-3 text-center">Tools Used</h2>
                <div className="h3 text-center">
                    <a href="https://www.discord.com">Discord (Team Communication)</a><br />
                    <a href="https://cloud.google.com/">Google Cloud Platform (Website Hosting)</a><br />
                    <a href="https://about.gitlab.com/">GitLab (Git Repository Hosting)</a><br />
                    <a href="https://flask.palletsprojects.com/en/2.1.x/">Flask (Framework for Backend)</a><br />
                    <a href="https://getbootstrap.com/">Bootstrap (Frontend Formatting)</a><br />
                    <a href="https://spotipy.readthedocs.io/en/2.22.1/">Spotipy (Library to access Spotify
                        API)</a><br />
                    <a href="https://www.postgresql.org/docs/current/app-psql.html">psql (Frontend for
                        PostgreSQL)</a><br />
                    <a href="https://github.com/lixxu/flask-paginate">Flask Paginate (Pagination Library for
                        Python,
                        utilized for paginating site)</a><br />

                    {/* TODO: Remove? */}
                    {/* <!-- <a href="https://jupyter.org/">Jupyter Notebook (Used in scraping Spotify API)</a><br> -->
							<!-- <a href="https://pandas.pydata.org/">Pandas (used in Jupyter Notebook, helped in scraping Spotify API)</a><br><br> --> */}

                    <h2>APIs Used</h2>
                    <a href="https://developer.spotify.com/documentation/web-api/">Spotify Web API</a><br />

                </div>
            </section>

            <section>
                <h2 className="display-3 text-center">GitLab Stats</h2>
                <div className="h3 text-center">
                    <p>Total Commits: </p>
                    <p>Total Issues: </p>
                    <p>Total Unit Tests: </p>
                    <a href="https://gitlab.com/magretadekunle/cs331e-idb">GitLab Repository</a><br />
                    <a href="">GitLab Database Repo</a><br />
                    <a href="https://gitlab.com/magretadekunle/cs331e-idb/-/issues">GitLab Issue Tracker</a><br />
                    <a href="https://gitlab.com/magretadekunle/cs331e-idb/-/wikis/home">GitLab Wiki</a><br />
                    <a href="https://music-recommendation.postman.co/workspace/Team-Workspace~17d1e66a-099f-4ea0-833c-8973e17965de/collection/33692671-6403f3c6-d92b-49af-b5e0-21fc9aa5292a?tab=variables">Postman API Collection</a><br />
                    <a href="">Presentation Slides </a>
                </div>
            </section>
        </div>
    )
}