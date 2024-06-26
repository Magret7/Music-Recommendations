import { Link } from "react-router-dom";

export default function Pagination(props) {
    // Generate individual page links
    const pages = []
    const numPages = Math.ceil(props.arrayLength / 4)
    for (let i = 1; i < (numPages + 1); i++) {
        pages.push(
            <li className="page-item">
                <Link to={`page/${i}`} className="page-link">{i}</Link>
            </li>
        )
    }

    let pageNumInt = parseInt(props.pageNum)

    return (
        <div className="d-flex justify-content-center mt-3">
            <nav aria-label="Page navigation">
                <ul className="pagination">
                    {/* Only show previous button if not on first page */}
                    {(pageNumInt === 1 || !pageNumInt) ? <></> : (
                        <li className="page-item">
                            <Link to={`page/${pageNumInt - 1}`} className="page-link" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                                <span className="sr-only"></span>
                            </Link>
                        </li>)}
                    {pages}
                    {/* Only show next button if not on last page */}
                    {pageNumInt === numPages ? <></> : (
                        <li className="page-item">
                            <Link
                            // Conditional logic below is for if we're on the base artists/albums page,
                            // there are pages to page through, but no page number in the URL to add to.
                            // If there are page links but no page number in URL, that means the next page is page 2
                                to={(numPages && !pageNumInt) ? `page/2` : `page/${pageNumInt + 1}`}
                                className="page-link" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                                <span className="sr-only"></span>
                            </Link>
                        </li>)}
                </ul>
            </nav>
        </div>
    )
}