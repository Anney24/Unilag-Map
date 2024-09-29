interface Node {
    name: string;
    position: { lat: number; lng: number };
}

// Example function to calculate distance between two geographical points
function haversineDistance(pos1: { lat: number; lng: number }, pos2: { lat: number; lng: number }): number {
    const toRad = (x: number) => (x * Math.PI) / 180;

    const R = 6371; // Radius of the Earth in km
    const dLat = toRad(pos2.lat - pos1.lat);
    const dLng = toRad(pos2.lng - pos1.lng);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(pos1.lat)) * Math.cos(toRad(pos2.lat)) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
}

export function astar(start: Node, end: Node, locations: Node[]): Node[] {
    const openSet: Node[] = [start];
    const cameFrom: Map<Node, Node> = new Map();

    const gScore: Map<Node, number> = new Map(locations.map(loc => [loc, Infinity]));
    gScore.set(start, 0);

    const fScore: Map<Node, number> = new Map(locations.map(loc => [loc, Infinity]));
    fScore.set(start, haversineDistance(start.position, end.position));

    while (openSet.length > 0) {
        const current = openSet.reduce((lowest, node) => {
            return fScore.get(node)! < fScore.get(lowest)! ? node : lowest;
        });

        if (current === end) {
            return reconstructPath(cameFrom, current);
        }

        openSet.splice(openSet.indexOf(current), 1);

        for (const neighbor of getNeighbors(current, locations)) {
            const tentativeGScore = gScore.get(current)! + haversineDistance(current.position, neighbor.position);

            if (tentativeGScore < gScore.get(neighbor)!) {
                cameFrom.set(neighbor, current);
                gScore.set(neighbor, tentativeGScore);
                fScore.set(neighbor, tentativeGScore + haversineDistance(neighbor.position, end.position));

                if (!openSet.includes(neighbor)) {
                    openSet.push(neighbor);
                }
            }
        }
    }

    return []; // Return an empty path if no path is found
}

function getNeighbors(node: Node, locations: Node[]): Node[] {
    // In a real application, this would return actual neighbors based on the graph structure.
    return locations.filter(loc => loc !== node); // Placeholder: return all locations except the current node
}

function reconstructPath(cameFrom: Map<Node, Node>, current: Node): Node[] {
    const totalPath = [current];
    while (cameFrom.has(current)) {
        current = cameFrom.get(current)!;
        totalPath.push(current);
    }
    return totalPath.reverse();
}
