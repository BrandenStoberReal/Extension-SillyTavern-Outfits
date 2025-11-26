import {logger} from './logger';

const toastr = {
    info: (message: string) => {
        if (window.toastr) {
            window.toastr.info(message);
        } else {
            logger.error('window.toastr is not available');
        }
    },
    success: (message: string) => {
        if (window.toastr) {
            window.toastr.success(message);
        } else {
            logger.error('window.toastr is not available');
        }
    },
    warning: (message: string) => {
        if (window.toastr) {
            window.toastr.warning(message);
        } else {
            logger.error('window.toastr is not available');
        }
    },
    error: (message: string) => {
        if (window.toastr) {
            window.toastr.error(message);
        } else {
            logger.error('window.toastr is not available');
        }
    },
};

export default toastr;
