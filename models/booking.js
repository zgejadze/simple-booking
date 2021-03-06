const mongodb = require("mongodb");
const db = require("../data/database");

class Booking {
  constructor(bookingData) {
    this.name = bookingData.name;
    this.source = bookingData.source;
    this.room = bookingData.room;
    this.startDate = new Date(bookingData.startDate);
    this.endDate = new Date(bookingData.endDate);
    this.id = bookingData._id;
  }

  async save() {
    const bookingData = {
      name: this.name,
      source: this.source,
      room: this.room,
      startDate: this.startDate,
      endDate: this.endDate,
    };

    await db.getDb().collection("bookings").insertOne(bookingData);
  }

  static async lookForBookedRooms(bookingStarts, bookingEnds) {
    const startDate = new Date(bookingStarts);
    const endDate = new Date(bookingEnds);

    const query = {
      $or: [
        {
          startDate: {
            $gt: startDate,
            $lt: endDate,
          },
        },
        {
          endDate: {
            $gt: startDate,
            $lt: endDate,
          },
        },
        {
          startDate: { $lte: startDate },
          endDate: { $gte: endDate },
        },
      ],
    };

    const result = await db
      .getDb()
      .collection("bookings")
      .find(query)
      .toArray();
    return result.map(function (result) {
      return new Booking(result);
    });
  }

  static async RoomIsBooked(room, bookingStarts, bookingEnds) {
    const startDate = new Date(bookingStarts);
    const endDate = new Date(bookingEnds);
    const query = {
      room: room,
      $or: [
        {
          startDate: {
            $gt: startDate,
            $lt: endDate,
          },
        },
        {
          endDate: {
            $gt: startDate,
            $lt: endDate,
          },
        },
        {
          startDate: { $lte: startDate },
          endDate: { $gte: endDate },
        },
      ],
    };
    try {
      const result = await db
        .getDb()
        .collection("bookings")
        .find(query)
        .toArray();
      return result.map(function (result) {
        return new Booking(result);
      });
    } catch (error) {
      next(error);
    }
  }

  static async searchSourceAndDates(source, bookingStarts, bookingEnds) {
    const startDate = new Date(bookingStarts);
    const endDate = new Date(bookingEnds);
    const query = {
      source: source,
      $or: [
        {
          startDate: {
            $gt: startDate,
            $lt: endDate,
          },
        },
        {
          endDate: {
            $gt: startDate,
            $lt: endDate,
          },
        },
        {
          startDate: { $lte: startDate },
          endDate: { $gte: endDate },
        },
      ],
    };
    try {
      const result = await db
        .getDb()
        .collection("bookings")
        .find(query)
        .toArray();
      return result.map(function (result) {
        return new Booking(result);
      });
    } catch (error) {
      next(error);
    }
  }

  static async searchWithRoomAndSource(
    room,
    source,
    bookingStarts,
    bookingEnds
  ) {
    const startDate = new Date(bookingStarts);
    const endDate = new Date(bookingEnds);
    const query = {
      source: source,
      room: room,
      $or: [
        {
          startDate: {
            $gt: startDate,
            $lt: endDate,
          },
        },
        {
          endDate: {
            $gt: startDate,
            $lt: endDate,
          },
        },
        {
          startDate: { $lte: startDate },
          endDate: { $gte: endDate },
        },
      ],
    };
    try {
      const result = await db
        .getDb()
        .collection("bookings")
        .find(query)
        .toArray();
      return result.map(function (result) {
        return new Booking(result);
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Booking;
