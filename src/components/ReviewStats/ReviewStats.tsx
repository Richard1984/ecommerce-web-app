import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Paper from '../Paper/Paper';
import styles from './review-stats.module.scss';

interface IReviewStatsProps {
    stats: {
        "0": number;
        "1": number;
        "2": number;
        "3": number;
        "4": number;
        "5": number;
    }
}

const ReviewStats = (props: IReviewStatsProps) => {

    const { stats } = props;

    const getStat = (key: string, value: number) => (
        <div className={styles.stat}>
            <div className={styles.star}>
                <div className={styles.text}>{key}</div>
                <div className={styles.icon}>
                    <FontAwesomeIcon icon={faStar} />
                </div>
            </div>
            <div className={styles.progress} >
                <div className={styles.progressValue} style={{ width: `${value / totalReviews * 300}px`}}></div>
            </div>
            <div className={styles.value}>{stats[key as keyof typeof stats]}</div>
        </div>
    )

    const totalReviews = stats["0"] + stats["1"] + stats["2"] + stats["3"] + stats["4"] + stats["5"];

    return (
        <Paper className={styles.container}>
            <div className={styles.title}>Distribuzioni recensioni</div>
            <div className={styles.stats}>
                {getStat("5", stats["5"])}
                {getStat("4", stats["4"])}
                {getStat("3", stats["3"])}
                {getStat("2", stats["2"])}
                {getStat("1", stats["1"])}
            </div>
        </Paper>
    )
}

export default ReviewStats;