function check_container_name() {
  container_name="$1"

  if docker inspect -f '{{.Name}}' "$container_name" >/dev/null 2>&1; then
    echo true
  else
    echo false
  fi
}
