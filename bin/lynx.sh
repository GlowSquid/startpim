#!/bin/bash

lynx -cfg=<(printf '%s\n' 'PRINTER:P:printf "%0s\\n" "$LYNX_PRINT_TITLE">&3:TRUE'
  ) lynx 3>&1 > /dev/null -nopause -noprint -accept_all_cookies -cmd_script <(
    printf '%s\n' "key p" "key Select key" "key ^J" exit
  ) $1