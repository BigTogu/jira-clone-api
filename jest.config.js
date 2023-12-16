export default {
	transform: {
		'^.+\\.js$': 'babel-jest',
	},
	testEnvironment: 'node',
	setupFilesAfterEnv: ['./test/scripts/setUp.js'],
	// ... other configurations
};
