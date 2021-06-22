import { Sequelize } from 'sequelize';
import { todoTable } from './models/todo';

const { DB = "database", DB_PORT, ROOT = "root", PASS = "pass", HOST = "localhost" } = process.env;

let sequelize: Sequelize;

try {
	sequelize = new Sequelize(
    DB, 
    ROOT, 
    PASS, 
    {
      host : HOST,
			port: parseInt(DB_PORT as string),
      dialect: 'mysql',
      define: {
        charset: "utf8mb4",
        collate: "utf8mb4_unicode_ci"
		  }
	  }
  );

	const modelDefiners: any = [
		todoTable,
	];
	
	for (const modelDefiner of modelDefiners) {
		modelDefiner(sequelize);
	}
} catch(err) {
	console.log("mysql database connect error:", err);
  
	process.exit(1);
}

export default sequelize;