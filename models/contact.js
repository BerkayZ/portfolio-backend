module.exports = (sequelize, DataTypes) => {
    const Contact = sequelize.define( "Contact", {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        isRead: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        subject: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        message: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        createdAt: {
            allowNull: true,
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            allowNull: true,
            type: DataTypes.DATE,
        },
        deletedAt: {
            allowNull: true,
            type: DataTypes.DATE,
        },
    }, {
        timestamps: true
    });

    return Contact;
}
