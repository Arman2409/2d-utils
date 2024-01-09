// core/uniqueId.ts
var uniqueId = (others) => {
  const newId = crypto.randomUUID();
  if (others) {
    let isTaken;
    others.forEach((id) => {
      if (newId === id)
        isTaken = true;
    });
    if (isTaken)
      return uniqueId(others);
    return newId;
  }
  return newId;
};
var uniqueId_default = uniqueId;

// core/randomNumber.ts
var randomNumber = (min, max) => Math.random() * (max - min) + min;
var randomNumber_default = randomNumber;

// core/inRange.ts
var inRange = (number, minLimit, maxLimit) => number >= minLimit && number <= maxLimit;
var inRange_default = inRange;

// core/pointWithoutCollision.ts
var pointWithoutCollision = (minX, maxX, minY, maxY, distance2, others) => {
  const x = randomNumber_default(minX, maxX);
  const y = randomNumber_default(minY, maxY);
  let hasCollides = false;
  others.forEach(({ x: otherX, y: otherY }) => {
    if (inRange_default(x, otherX - distance2, otherX + distance2) && inRange_default(y, otherY - distance2, otherY + distance2)) {
      hasCollides = true;
    }
  });
  if (hasCollides) {
    return pointWithoutCollision(
      minX,
      maxX,
      minY,
      maxY,
      distance2,
      others
    );
  } else {
    return { x, y };
  }
};
var pointWithoutCollision_default = pointWithoutCollision;

// core/distance.ts
var distance = (x1, y1, x2, y2) => {
  const xDistance = Math.abs(x1 - x2);
  const yDistance = Math.abs(y1 - y2);
  return Math.sqrt(xDistance ** 2 + yDistance ** 2);
};
var distance_default = distance;

// core/middlePoint.ts
var getMiddlePoint = (x1, y1, x2, y2) => {
  const xDistance = Math.abs(x1 - x2);
  const yDistance = Math.abs(y1 - y2);
  const middleX = x2 >= x1 ? xDistance / 2 : -xDistance / 2;
  const middleY = y2 >= y1 ? yDistance / 2 : -yDistance / 2;
  return {
    x: middleX,
    y: middleY
  };
};
var middlePoint_default = getMiddlePoint;

// core/collision.ts
var collision = (x1, y1, x2, y2, collisionDistance, callback) => {
  if ((inRange_default(x1, x2 - collisionDistance, x2) || inRange_default(x1, x2, x2 + collisionDistance)) && (inRange_default(y1, y2 - collisionDistance, y2) || inRange_default(y1, y2, y2 + collisionDistance))) {
    callback && callback();
    return true;
  }
  ;
  return false;
};
var collision_default = collision;

// core/collisionInArray.ts
var collisionInArray = (x, y, radius, arr, callback, repeated) => {
  if (!repeated)
    repeated = 0;
  repeated++;
  if (repeated >= 100) {
    console.error("Can't get needed dimesions, returning current dimesions");
    return {
      x,
      y
    };
  }
  let hasCollides = false;
  let collisionX = 0;
  let collisionY = 0;
  arr.forEach(({ x: pointX, y: pointY }) => {
    if (hasCollides)
      return;
    collision_default(x, y, pointX, pointY, radius, () => {
      hasCollides = true;
      collisionX = pointX;
      collisionY = pointY;
    });
  });
  if (hasCollides) {
    const collisionPoint = {
      x: collisionX,
      y: collisionY
    };
    callback && callback(collisionPoint);
    return collisionPoint;
  }
  return false;
};
var collisionInArray_default = collisionInArray;

// core/angle.ts
var pi = Math.PI;
var angle = (startX, startY, endX, endY) => {
  const xDifference = endX - startX;
  const yDifference = endY - startY;
  let toQuarter;
  if (xDifference >= 0) {
    if (yDifference >= 0) {
      toQuarter = 2;
    } else {
      toQuarter = 1;
    }
  } else {
    if (yDifference >= 0) {
      toQuarter = 3;
    } else {
      toQuarter = 4;
    }
  }
  const xChange = Math.abs(endX - startX);
  const yChange = Math.abs(endY - startY);
  const tan = toQuarter === 1 || toQuarter === 3 ? xChange / yChange : yChange / xChange;
  const angle_in_radians = (toQuarter - 1) * pi / 2 + Math.atan(tan);
  return angle_in_radians;
};
var angle_default = angle;

// core/randomBoolean.ts
var randomBoolean = () => Boolean(Math.round(Math.random()));
var randomBoolean_default = randomBoolean;

// core/randomPoint.ts
var randomPoint = (xMin, xMax, yMin, yMax) => ({
  x: xMax ? randomNumber_default(xMin || 0, xMax) : Math.random() * 100,
  y: yMax ? randomNumber_default(yMin || 0, yMax) : Math.random() * 100
});
var randomPoint_default = randomPoint;

// core/randomPoints.ts
var randomPoints = (xLimitsMin, xLimitsMax, yLimitsMin, yLimitsMax, count) => {
  const points = [];
  for (let i = 0; i < count; i++) {
    const x = randomNumber_default(xLimitsMin, xLimitsMax);
    const y = randomNumber_default(yLimitsMin, yLimitsMax);
    points.push({ x, y });
  }
  return points;
};
var randomPoints_default = randomPoints;
export {
  angle_default as angle,
  collision_default as collision,
  collisionInArray_default as collisionInArray,
  distance_default as distance,
  pointWithoutCollision_default as generatePointWithoutCollisions,
  inRange_default as inRange,
  middlePoint_default as middlePoint,
  pointWithoutCollision_default as pointWithoutCollision,
  randomBoolean_default as randomBoolean,
  randomNumber_default as randomNumber,
  randomPoint_default as randomPoint,
  randomPoints_default as randomPoints,
  uniqueId_default as uniqueId
};
