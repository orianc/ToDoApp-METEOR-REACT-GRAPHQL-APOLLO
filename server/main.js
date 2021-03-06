import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { TasksCollection } from '../imports/api/collection/TasksCollection';
import '../imports/api/methods/tasksPublications';
import '../imports/api/methods/tasksMethods';
import '../imports/api/methods/signUpMethods';
import '../imports/api/graphql';

const DEFAULT_USERNAME = 'meteorite';
const DEFAULT_PASSWORD = 'password';
/**
 *
 * This method insert data in TasksCollection
 * @param {*} taskText
 */
const insertTask = (taskText, user) => {
	TasksCollection.insert({
		text: taskText,
		createdAt: new Date(),
		userId: user._id,
		createdBy: user.username,
	});
};

Meteor.startup(() => {
	//this is to setup default value on db

	if (!Accounts.findUserByUsername(DEFAULT_USERNAME)) {
		Accounts.createUser({
			username: DEFAULT_USERNAME,
			password: DEFAULT_PASSWORD,
		});
	}
	const user = Accounts.findUserByUsername(DEFAULT_USERNAME);

	if (TasksCollection.find().count() === 0) {
		[
			'One Task',
			'One Task',
			'One Task',
			'One Task',
			'One Task',
			'One Task',
			'One Task',
			'One Task',
		].forEach((taskText) => insertTask(taskText, user));
	}
});
