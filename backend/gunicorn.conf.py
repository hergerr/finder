from multiprocessing import cpu_count


def max_workers():
    return cpu_count()


# https://devops.stackexchange.com/a/3383
bind = '0.0.0.0:8000'
workers = max_workers()
access_logfile = '/tmp/app_gunicorn_access.log'
error_logfile = '/tmp/app_gunicorn_errors.log'
max_requests = 1000
