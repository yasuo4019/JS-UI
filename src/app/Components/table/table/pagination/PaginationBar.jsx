import { useMemo, useCallback } from 'react';
import Pagination from 'react-bootstrap/Pagination';

const step = 2;
const startIndex = 1;

function PaginationBar(props) {
    const { pageIndex, pagesCount } = props;
    const { goFirst, goLast, goToPage, goPrevious, goNext } = props;

    const prevEllipsed = useMemo(() => (pageIndex - step) > startIndex + 1, [pageIndex]);
    const nextEllipsed = useMemo(() => (pageIndex + step) < pagesCount - 1, [pageIndex, pagesCount]);
    const arrayLength = useMemo(() => (!prevEllipsed || !nextEllipsed) ? step + 1 : (step * 2) + 1, [prevEllipsed, nextEllipsed]);

    const pagesItemIndexes = useMemo(() => Array.from(
        { length: arrayLength },
        (_, index) =>
            (prevEllipsed && !nextEllipsed) ? (pagesCount - (arrayLength - index)) :
                (!prevEllipsed && nextEllipsed) ? (startIndex + index) :
                    (!prevEllipsed && !nextEllipsed) ? (index + 1) : ((pageIndex - step) + index)
    ),
        [prevEllipsed, nextEllipsed, arrayLength, pagesCount, pageIndex]
    );

    const paginationItems = pagesItemIndexes.map(index =>
        <Pagination.Item
            key={index}
            active={pageIndex === index}
            onClick={() => goToPage(index)}>{index}</Pagination.Item>
    );

    const goPreviousCall = useCallback(() => goPrevious(pageIndex), [pageIndex, goPrevious]);
    const goNextCall = useCallback(() => goNext(pageIndex), [pageIndex, goNext]);
    const goLastCall = useCallback(() => goLast(pagesCount), [pagesCount, goLast]);

    return (
        <Pagination>
            {
                pageIndex !== startIndex && (
                    <>
                        <Pagination.First onClick={goFirst} />
                        <Pagination.Prev onClick={goPreviousCall} />
                    </>
                )
            }
            {pagesItemIndexes.includes(startIndex) ? null :
                <Pagination.Item
                    active={pageIndex === startIndex}
                    onClick={() => goToPage(startIndex)}>{startIndex}</Pagination.Item>
            }
            {prevEllipsed && <Pagination.Ellipsis />}
            {paginationItems}
            {nextEllipsed && <Pagination.Ellipsis />}
            {pagesItemIndexes.includes(pagesCount) ? null :
                <Pagination.Item
                    active={pageIndex === pagesCount}
                    onClick={() => goToPage(pagesCount)}>{pagesCount}</Pagination.Item>
            }
            {
                pageIndex !== pagesCount && (
                    <>
                        <Pagination.Next onClick={goNextCall} />
                        <Pagination.Last onClick={goLastCall} />
                    </>
                )
            }
        </Pagination>
    );
}

export default PaginationBar;
