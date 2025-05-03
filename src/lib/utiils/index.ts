   // Format play count
   export function formatPlays(plays: number) {
    if (plays >= 1000) {
        return (plays / 1000).toFixed(1) + 'k';
    }
    return plays;
}