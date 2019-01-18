import axios from "axios/index";
import URLs from "../_urls";

const MediaService = {
    uploadMedia: (file, callback) => {
        const _formdata = new FormData();
        _formdata.append("Image", file, file.name);

        axios({
            method: 'post',
            url: URLs.media.base + URLs.media.upload,
            data: _formdata,
            config: { headers: {'Content-Type': undefined }}
        })
            .then(function (response) {
                callback(response);
            })
            .catch(function (response) {
                callback(response);
            });

        // const xhr = new XMLHttpRequest();
        // xhr.open('POST', URLs.media.base + URLs.media.upload);
        // xhr.setRequestHeader("Authorization", 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzaGVoYW5AZHVvc29mdHdhcmUuY29tIiwianRpIjoiZGQ5MzUwNWUtYjczZi00ZDQzLThjNjItMjA3MzUxNTEwMTU0Iiwic3ViIjoiQWNjZXNzIGNsaWVudCIsImV4cCI6MTUzODExNDYxNCwidGVuYW50IjoxLCJjb21wYW55IjoxMywiY29tcGFueU5hbWUiOiJ0aXN0dXNsYWJzIiwiY29udGV4dCI6e30sInNjb3BlIjpbeyJyZXNvdXJjZSI6Im15TmF2aWdhdGlvbiIsImFjdGlvbnMiOlsicmVhZCJdfSx7InJlc291cmNlIjoibXlVc2VyUHJvZmlsZSIsImFjdGlvbnMiOlsicmVhZCJdfSx7InJlc291cmNlIjoid2FsbGV0IiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXX0seyJyZXNvdXJjZSI6InNpcHVzZXIiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoiYXR0cmlidXRlIiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXX0seyJyZXNvdXJjZSI6Imdyb3VwIiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXX0seyJyZXNvdXJjZSI6InJlc291cmNldGFza2F0dHJpYnV0ZSIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19LHsicmVzb3VyY2UiOiJ0YXNrIiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXX0seyJyZXNvdXJjZSI6InByb2R1Y3Rpdml0eSIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19LHsicmVzb3VyY2UiOiJTaGFyZWQiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoidGFza2luZm8iLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoiYXJkc3Jlc291cmNlIiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXX0seyJyZXNvdXJjZSI6ImFyZHNyZXF1ZXN0IiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXX0seyJyZXNvdXJjZSI6InJlcXVlc3RtZXRhIiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXX0seyJyZXNvdXJjZSI6InF1ZXVlIiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXX0seyJyZXNvdXJjZSI6InJlcXVlc3RzZXJ2ZXIiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoidXNlciIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19LHsicmVzb3VyY2UiOiJ1c2VyUHJvZmlsZSIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19LHsicmVzb3VyY2UiOiJvcmdhbmlzYXRpb24iLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSJdfSx7InJlc291cmNlIjoicmVzb3VyY2UiLCJhY3Rpb25zIjpbInJlYWQiXX0seyJyZXNvdXJjZSI6InBhY2thZ2UiLCJhY3Rpb25zIjpbInJlYWQiXX0seyJyZXNvdXJjZSI6ImNvbnNvbGUiLCJhY3Rpb25zIjpbInJlYWQiXX0seyJyZXNvdXJjZSI6InVzZXJTY29wZSIsImFjdGlvbnMiOlsicmVhZCIsIndyaXRlIiwiZGVsZXRlIl19LHsicmVzb3VyY2UiOiJ1c2VyQXBwU2NvcGUiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoidXNlck1ldGEiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoidXNlckFwcE1ldGEiLCJhY3Rpb25zIjpbInJlYWQiLCJ3cml0ZSIsImRlbGV0ZSJdfSx7InJlc291cmNlIjoiY2xpZW50IiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXX0seyJyZXNvdXJjZSI6ImNsaWVudFNjb3BlIiwiYWN0aW9ucyI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXX1dLCJpYXQiOjE1Mzc1MDk4MTR9.5Gwu8WgwcHhZ0aVeooUUtJu-CoU5bmdP-EqMUvzk0ts');
        // xhr.onload = function () {
        //     const res = JSON.parse(xhr.response);
        //     if (!res.IsSuccess) {
        //         callback(res);
        //     }
        // };
        // xhr.onerror = function () {
        //     callback(xhr.response);
        // };
        // xhr.send(_formdata);
    }
};

export { MediaService }